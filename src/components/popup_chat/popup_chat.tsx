import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { userIdAtom, userProfileAtom } from '../../state/auth';
import InputImg from '../input_img/input_img';
import InputGallery from '../input_gallery/input_gallery';
import StoreServices, { IChat } from '../../services/fire_store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PopupChat = () => {
  // services
  const storeService = new StoreServices();
  // recoil
  const userID = useRecoilValue(userIdAtom);
  const userProfile = useRecoilValue(userProfileAtom);

  // state
  const [isOpen, setIsOpen] = useState(false); // popup open
  const [fileURL, setFileURL] = useState(''); // fileURl
  const [uploadURL, setUploadURL] = useState(''); // upload img url

  // hook
  const { register, handleSubmit, reset } = useForm();

  // ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // cutom func
  const toggleOpen = () => setIsOpen(prev => !prev);

  const onReset = () => {
    reset(); // form 리셋
    drawCanvas(); // 캔버스지우기
    setUploadURL(''); // 캔버스가 업로드한 이미지 data 지우기
    setFileURL(''); // 파일 업로드 흔적지우기
  };

  const drawCanvas = (value?: HTMLImageElement) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    if (value === undefined) {
      ctx?.clearRect(0, 0, 300, 300);
      return;
    }

    ctx?.clearRect(0, 0, 300, 300);
    ctx?.drawImage(value, 0, 0, 300, 300);
    const url = canvasRef.current.toDataURL('image/jpeg');
    console.log(url);
    setUploadURL(url);
  };

  const createImgElement = (imgURL: string) => {
    const img = new Image();
    img.onload = () => {
      drawCanvas(img);
    };
    img.src = imgURL;
    img.crossOrigin = 'Anonymous';
  };

  const onUpdate = (imgURL: any) => createImgElement(imgURL);

  const onUpadteGallery = (imgURL: string) => {
    drawCanvas(); // 캔버스지우기
    setUploadURL(imgURL); // 캔버스가 업로드한 이미지 data 지우기
  };

  const onSubmit: SubmitHandler<HTMLFormElement> = async data => {
    if (!userID || !userProfile) return;

    const newChat: IChat = {
      userID,
      createAt: Date.now(),
      message: data.message,
      imgURL: uploadURL,
      userProfile,
    };

    if (!newChat.message && !newChat.imgURL) return;
    onReset();
    await storeService.uploadChat(newChat);
  };

  return (
    <section>
      {!isOpen && (
        <motion.button
          layoutId="chat"
          className="fixed right-2 bottom-2 w-16 h-16 bg-rose-500 text-white text-3xl rounded-full"
          onClick={toggleOpen}
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          layoutId="chat"
          className="fixed w-full bottom-0 left-0 h-fit p-2 bg-rose-500"
        >
          {/* 클로즈 버튼 */}
          <button
            className="absolute -top-5 right-5 w-10 h-10 bg-white text-2xl rounded-full"
            onClick={toggleOpen}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 텍스트 */}
            <div className="flex mb-2">
              {/* 미리보기 */}
              <div className="relative w-[150px] h-[150px] shrink-0 grow-0 mr-4">
                <canvas
                  className="w-full h-full"
                  ref={canvasRef}
                  width={300}
                  height={300}
                />
                <img
                  className="absolute top-0 left-0 w-full h-full"
                  src={uploadURL}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = 'images/default_logo.png';
                  }}
                  alt="select img"
                />
              </div>

              {/* 입력창 */}
              <div className="flex-1">
                <textarea
                  {...register('message')}
                  className="w-full h-full p-4"
                  cols={20}
                  rows={4}
                />
              </div>
            </div>

            {/* 전송 */}
            <div className="flex justify-between">
              {/* 파일 업로드 */}
              <ul className="flex ">
                <InputGallery onUpdate={onUpadteGallery} />
                <InputImg onUpdate={onUpdate} />
              </ul>

              {/* 데이터 업로드 */}
              <ul className="flex">
                <li>
                  <button
                    className="btn-md btn-ghost rounded-xl py-1"
                    onClick={onReset}
                    type="reset"
                  >
                    리셋
                  </button>
                </li>
                <li>
                  <button
                    className="btn-md btn-ghost rounded-xl py-1"
                    type="submit"
                  >
                    전송
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </motion.div>
      )}
    </section>
  );
};

export default PopupChat;
