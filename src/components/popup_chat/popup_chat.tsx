import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { userIdAtom } from '../../state/auth';
import InputImg from '../input_img/input_img';
import InputGallery from '../input_gallery/input_gallery';
import StoreServices, { IChat } from '../../services/fire_store';

const PopupChat = () => {
  // services
  const storeService = new StoreServices();
  // recoil
  const userID = useRecoilValue(userIdAtom);

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
    if (!userID) return;

    const newChat: IChat = {
      userID,
      createAt: Date.now(),
      message: data.message,
      imgURL: uploadURL,
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
          className="fixed right-2 bottom-2 w-16 h-16 bg-rose-500 rounded-full"
          onClick={toggleOpen}
        >
          채팅
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          layoutId="chat"
          className="fixed w-full bottom-0 left-0 h-fit p-2 bg-rose-500"
        >
          {/* 클로즈 버튼 */}
          <button
            className="absolute -top-5 right-5 w-10 h-10 bg-white rounded-full"
            onClick={toggleOpen}
          >
            클로즈
          </button>

          {/* 파일선택 */}
          <ul className="flex mb-2">
            <InputGallery onUpdate={onUpadteGallery} />
            <InputImg onUpdate={onUpdate} />
          </ul>

          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            {/* 미리보기 */}
            <div className="relative w-[150px] h-[150px] shrink-0 grow-0 mr-4">
              <canvas
                className="w-full h-full"
                ref={canvasRef}
                width={300}
                height={300}
              />
              <picture>
                <source />
              </picture>
              <img
                className="absolute top-0 left-0 w-full h-full"
                src={uploadURL}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  console.log(currentTarget);
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

            {/* 전송 */}
            <div>
              <button onClick={onReset} type="reset">
                리셋
              </button>
              <button type="submit">전송</button>
            </div>
          </form>
        </motion.div>
      )}
    </section>
  );
};

export default PopupChat;