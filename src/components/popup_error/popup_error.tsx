import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { errorAtom } from '../../state/data';

const PopupError: React.FC = () => {
  const setIsError = useSetRecoilState(errorAtom);

  const onClose = () => setIsError(false);

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
      className="fixed bg-neutral-900/75 top-0 right-0 left-0 bottom-0 z-[99] "
    >
      <div className="w-full h-full" onClick={onClose} />

      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2  flex flex-col justify-center items-center w-fit h-fit bg-neutral-200 z-[99] text-neutral-800 py-4 px-8 rounded-lg">
        <h1 className="font-bold text-lg mb-2">로그인 에러</h1>
        <p className="mb-2">
          로그인 하지 않으면 서버에 데이터를 올릴 수 없어요.
        </p>
        <button className="btn-primary py-1 px-2 rounded-lg" onClick={onClose}>
          닫기
        </button>
      </div>
    </motion.section>
  );
};

export default PopupError;
