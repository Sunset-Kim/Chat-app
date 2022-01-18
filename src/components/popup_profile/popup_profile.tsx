import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authServiceAtom, userIdAtom } from '../../state/auth';
import { storeAtom } from '../../state/data';
import InputImg from '../input_img/input_img';
import { imageUploadeAtom } from '../../state/uploader';
import { motion, Variants } from 'framer-motion';

interface PopupProps {
  onClose: () => void;
}

const PopupProfile: React.FC<PopupProps> = ({ onClose }) => {
  const authService = useRecoilValue(authServiceAtom);
  const storeService = useRecoilValue(storeAtom);
  const storageService = useRecoilValue(imageUploadeAtom);
  const userID = useRecoilValue(userIdAtom);

  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
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
    setUploading(true);
    if (!userID) return;
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
            <span className="text-sm font-semibold ">프로필 이미지</span>
            <div className="flex items-end mb-2 border border-rose-400 p-2 rounded-xl">
              <img
                className="w-24 h-24 rounded-full mr-2"
                src={imgURL ? imgURL : profile.img}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = 'images/default_logo.png';
                }}
                alt="user profile"
              />

              <div className="h-fit">
                <InputImg onUpdate={onUpdateImg} />
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

            <button className="bg-rose-600 btn-primary btn-md" type="submit">
              업데이트
            </button>
          </form>

          {/* 업로드 spinner */}
          {uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-neutral-900/75"
            >
              <div className="border-8 border-rose-600 border-t-rose-50 w-16 h-16 rounded-full animate-spin"></div>
            </motion.div>
          )}
        </div>
      )}
    </motion.section>
  );
};

export default PopupProfile;
