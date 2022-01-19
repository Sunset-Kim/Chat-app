import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { userIdAtom, userProfileAtom } from '../../state/auth';
import InputImg from '../input_img/input_img';
import InputGallery from '../input_gallery/input_gallery';
import StoreServices, { IChat } from '../../services/fire_store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faImages,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import {
  faChevronDown,
  faShare,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

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
    console.log(data);
    console.log('실행');
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
          className="fixed right-2 bottom-2 w-16 h-16 bg-amber-400 text-white text-3xl rounded-full"
          onClick={toggleOpen}
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          layoutId="chat"
          className="fixed w-full max-h-[200px] bottom-0 left-0 h-fit p-2 bg-amber-300 border-t border-t-amber-200"
        >
          {/* 클로즈 버튼 */}
          <button
            className="absolute -top-8 right-0 w-8 h-8 px-6 flex justify-center items-center bg-amber-300 text-xl rounded-t-lg text-amber-700 shadow-none hover:bg-amber-500"
            onClick={toggleOpen}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 이미지 미리보기 텍스트 입력부 */}
            <div className="flex my-2 items-center justify-center">
              {/* 미리보기 */}
              <div className="relative w-24 h-24 mr-4">
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
              <div className="flex-1 w-full h-full">
                <textarea
                  placeholder="메세지 히어"
                  {...register('message')}
                  className="textarea"
                  cols={20}
                  rows={3}
                />
              </div>
            </div>

            {/* 파일업로드 전송관련 */}
            <div className="flex justify-between">
              {/* 폼 버튼 */}
              <ul className="flex">
                <li>
                  <button
                    className="mr-2 btn-secondary btn-md rounded-full bg-orange-300 translate-x-6"
                    onClick={onReset}
                    type="reset"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </li>

                <li>
                  <button
                    className="absolute right-4 bottom-16 w-10 h-10 btn-solid bg-amber-500 rounded-full"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </li>
              </ul>

              {/* 파일 업로드 */}
              <ul className="flex ">
                <InputGallery
                  onUpdate={onUpadteGallery}
                  className="mr-2 btn-secondary btn-md rounded-full"
                  buttonText={<FontAwesomeIcon icon={faImages} />}
                />
                <InputImg
                  onUpdate={onUpdate}
                  buttonText={<FontAwesomeIcon icon={faUpload} />}
                  className="mr-2 btn-secondary btn-md rounded-full"
                />
              </ul>
            </div>
          </form>
        </motion.div>
      )}
    </section>
  );
};

export default PopupChat;
