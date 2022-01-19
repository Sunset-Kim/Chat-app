import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authServiceAtom, userIdAtom } from '../../state/auth';
import { storeAtom } from '../../state/data';
import InputImg from '../input_img/input_img';
import { imageUploadeAtom, isUploadingAtom } from '../../state/uploader';
import { motion, Variants } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface PopupProps {
  onClose: () => void;
}

const PopupProfile: React.FC<PopupProps> = ({ onClose }) => {
  const authService = useRecoilValue(authServiceAtom);
  const storeService = useRecoilValue(storeAtom);
  const storageService = useRecoilValue(imageUploadeAtom);
  const userID = useRecoilValue(userIdAtom);
  const setUploading = useSetRecoilState(isUploadingAtom);

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>();
  const [imgURL, setImgURL] = useState<undefined | string>();

  const nameRef = useRef<HTMLInputElement>(null);

  const printProfile = async () => {
    if (!userID) return;
    setIsLoading(true);
    const snapshot = await storeService.getProfile(userID);
    if (!snapshot.exists()) return;
    setProfile(snapshot.data());
    setIsLoading(false);
  };

  const onUpdateImg = (value: any) => setImgURL(value);

  const onSubmit: ReactEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (!userID) return;
    setUploading(true);
    // 이미지 업로드
    const uploadImg = await storageService.upload(imgURL as any);
    // 서버 데이터 베이스 업로드
    authService.changeProfile(
      nameRef.current?.value ?? profile.name,
      imgURL ? uploadImg.url : profile.img,
    );
    storeService.setProfile(
      userID,
      nameRef.current?.value ?? profile.name,
      imgURL ? uploadImg.url : profile.img,
    );
    onClose();
    setUploading(false);
  };

  useEffect(() => {
    printProfile();
  }, [userID]);

  const popupVariants: Variants = {
    init: {
      opacity: 0,
      visibility: 'hidden',
    },
    start: {
      opacity: 1,
      visibility: 'visible',
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.section
      variants={popupVariants}
      initial="init"
      animate="start"
      exit="eixt"
    >
      <div
        className="fixed bg-neutral-900/75 top-0 right-0 left-0 bottom-0 z-40"
        onClick={onClose}
      />

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="fixed text-neutral-800 m-auto right-0 left-0 top-0 bottom-0 max-w-md max-h-128 w-full h-max z-50 rounded-lg pb-2 bg-neutral-200 rounded-b-lg">
          <form className="p-4" onSubmit={onSubmit}>
            <h2 className="text-center text-lg font-bold mb-2">
              {profile.name} 님의 프로필정보
            </h2>
            <div className="flex items-center mb-4">
              <div className="flex-1 mr-3">
                <div className="border border-amber-400 p-2 rounded-lg text-center">
                  <img
                    className="w-24 h-24 mx-auto rounded-full mb-2"
                    src={imgURL ? imgURL : profile.img}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = './images/default_logo.png';
                    }}
                    alt="user profile"
                  />

                  <div className="h-fit">
                    <InputImg
                      onUpdate={onUpdateImg}
                      className="btn-secondary py-1 w-full rounded-full"
                      buttonText={<FontAwesomeIcon icon={faUpload} />}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-sm font-semibold ">프로필 이름</span>
                <input
                  className="input"
                  type="text"
                  defaultValue={profile.name}
                  ref={nameRef}
                />
              </div>
            </div>

            <div>
              <button
                className="bg-amber-600 w-full btn-primary btn-md py-1 rounded"
                type="submit"
              >
                업데이트
              </button>
            </div>
          </form>
        </div>
      )}
    </motion.section>
  );
};

export default PopupProfile;
