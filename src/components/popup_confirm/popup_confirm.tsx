import React from 'react';
import { motion, Variants } from 'framer-motion';

interface PopupConfirmProps {
  onClose: () => void;
  onValid: (...arg: any) => void;
  message?: string;
  title?: string;
}

const PopupConfirm: React.FC<PopupConfirmProps> = ({
  onClose,
  onValid,
  message,
  title,
}) => {
  const popupVariants: Variants = {
    init: {
      opacity: 0,
    },
    start: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.section
      className="fixed top-0 right-0 left-0 bottom-0 z-40 flex justify-center items-center"
      variants={popupVariants}
      initial="init"
      animate="start"
      exit="eixt"
    >
      <div
        className="fixed bg-neutral-900/75 top-0 right-0 left-0 bottom-0"
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-xs h-fit max-h-48 bg-neutral-100 p-4 rounded-lg">
        <h1 className="border-b-2 border-amber-500 mb-4 pb-1 font-bold">
          {title ?? '확인'}
        </h1>
        <p className="mb-2">{message ?? '계속할까요?'}</p>
        <div className="text-right">
          <button
            className="btn-ghost px-2 py-1 rounded-lg bg-transparent mx-0.5"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="btn-solid px-2 py-1 rounded-lg mx-0.5"
            onClick={onValid}
          >
            확인
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default PopupConfirm;
