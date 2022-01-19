import React, { useEffect, useState } from 'react';
import { QuerySnapshot } from 'firebase/firestore';
import { Variants, motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import StoreServices, { ImageData } from '../../services/fire_store';
import StorageService from '../../services/storage';
import { userAtom } from '../../state/auth';
import { isUploadingAtom } from '../../state/uploader';
import ImgLoading from '../img_loading/img_loading';
import PopupConfirm from '../popup_confirm/popup_confirm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const CardStorage = () => {
  // recoil
  const user = useRecoilValue(userAtom);
  const setIsUploading = useSetRecoilState(isUploadingAtom);

  // services
  const storeService = new StoreServices();
  const storageService = new StorageService();

  // state
  const [item, setItem] = useState<any[]>([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | ImageData>(null);

  // custom func
  const onDelete: (data: ImageData) => void = async (data: ImageData) => {
    if (!user?.uid) return;
    setIsUploading(true);
    // 이미지 삭제
    await storageService.deleteImg(data.imgURL);
    // 게시물 삭제
    await storeService.deleteImages(user.uid, data.createAt);
    setIsUploading(false);
  };

  const onUpdate = (value: QuerySnapshot) => {
    const newValue = value.docs.map(item => item.data());
    setItem(newValue);
  };

  // life cycle
  useEffect(() => {
    if (!user?.uid) return;
    const sync = storeService.readSyncImages(user?.uid, onUpdate);
    return () => {
      sync();
    };
  }, []);

  return !user?.uid ? (
    <section>
      <p className="text-lg font-semibold">
        로그인 하시면 저장된 이미지를 확인할 수 있어요!
      </p>
    </section>
  ) : (
    <section>
      {/* confirm */}
      <AnimatePresence>
        {isConfirm && (
          <PopupConfirm
            title="만든 이미지 삭제"
            message="한번 삭제된 파일은 복구할 수 없어요. 정말로 삭제 합니까?"
            onClose={() => setIsConfirm(false)}
            onValid={() => {
              setIsConfirm(false);
              selectedItem && onDelete(selectedItem);
            }}
          />
        )}
      </AnimatePresence>

      {/* 갤러리 */}
      <h1 className="border-b-2 border-amber-400">
        <span className="text-lg font-bold">
          {user?.displayName ?? 'default'}
        </span>
        님이 만든 이미지
      </h1>

      <div className="grid p-3 gap-3 grid-cols-3 lg:grid-cols-7 ">
        {item.map(s => (
          <div key={s.createAt} className="overflow-hidden">
            <ImgLoading src={s.imgURL} alt="created" />
            <button
              className="btn-secondary w-full py-1 rounded-md"
              onClick={() => {
                setIsConfirm(true);
                setSelectedItem(s);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardStorage;
