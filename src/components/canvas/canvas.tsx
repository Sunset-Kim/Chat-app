import React, {
  ReactEventHandler,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { v1 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import StorageService from '../../services/storage';
import InputImg from '../input_img/input_img';
import { getDownloadURL } from 'firebase/storage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userIdAtom } from '../../state/auth';
import StoreService from '../../services/fire_store';
import PopupConfirm from '../popup_confirm/popup_confirm';
import { AnimatePresence } from 'framer-motion';
import { isUploadingAtom } from '../../state/uploader';

const Canvas = () => {
  // service
  const storageService = new StorageService();
  const storeService = new StoreService();

  // recoil value
  const userID = useRecoilValue(userIdAtom);
  const setIsUploading = useSetRecoilState(isUploadingAtom);

  // state
  const [text, setText] = useState<string>('첫번째줄 입니다');
  const [text2, setText2] = useState<string>('두번째줄 입니다');
  const [backImg, setBackImg] = useState<HTMLImageElement | undefined>();
  const [uploadImg, setUploadImg] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);

  // react-hook-form
  const { handleSubmit } = useForm();

  // ref
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasTextRef = useRef<HTMLCanvasElement>(null);

  // custom function
  const onUpdate = useCallback((url: string | ArrayBuffer) => {
    const img = new Image();
    img.onload = () => {
      setBackImg(img);
    };
    img.src = url as string;
  }, []);

  const onTextChange: ReactEventHandler<HTMLInputElement> = ({
    currentTarget,
  }) => {
    switch (currentTarget.name) {
      case '첫줄':
        setText(currentTarget.value);
        break;
      case '두번째줄':
        setText2(currentTarget.value);
        break;

      default:
        console.error('input state 저장 에러');
        break;
    }
  };

  const drawText = (ref: React.RefObject<HTMLCanvasElement>, y: number) => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    if (!ctx) return;
    if (backImg) {
      ctx.drawImage(backImg, 0, 0, 500, 500);
    } else {
      ctx.clearRect(0, 0, 500, 500);
    }
    ctx.font = '36px Spoqa Han Sans Neo';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1.3;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText(text, 250, y, 500);
    ctx.strokeText(text, 250, y, 500);
    ctx.fillText(text2, 250, y + 40, 500);
    ctx.strokeText(text2, 250, y + 40, 500);
  };

  const drawImg = () => {
    const ctx = canvasTextRef.current?.getContext('2d');
    if (!backImg) return;
    ctx?.drawImage(backImg, 0, 0, 500, 500);
  };

  const onUpload = () => {
    if (!canvasTextRef.current || !userID) return;
    drawImg();
    drawText(canvasTextRef, 400);
    const base64 = canvasTextRef.current.toDataURL('image/jpeg');
    if (base64 === uploadImg) {
      alert('같은파일입니다');
      return;
    }
    setUploadImg(base64);
    storageUpload(base64);
  };

  const reset = () => {
    setBackImg(undefined);
    setText('');
    setText2('');
    setUploadImg('');
  };

  const storageUpload = async (uploadImg: string) => {
    if (!userID) return;
    setIsUploading(true);
    const results = await storageService.uploadImg(uploadImg, uuid());
    const imgURL = await getDownloadURL(results.ref);
    const imageData = {
      userID: userID,
      imgURL,
      createAt: Date.now().toString(),
    };

    await storeService.uploadImages(imageData);
    reset();
    setIsUploading(false);
  };

  // confirm modal 관련
  const onOpen = () => setIsConfirm(true);
  const onClose = () => setIsConfirm(false);
  const onValid = () => {
    onClose();
    onUpload();
  };

  useEffect(() => {
    drawText(canvasTextRef, 400);
  }, [text, text2]);

  return (
    <>
      <AnimatePresence>
        {isConfirm && <PopupConfirm onClose={onClose} onValid={onValid} />}
      </AnimatePresence>

      <h1 className="text-center font-bold text-2xl mb-4">짤 만들기</h1>
      <section className="flex flex-col w-full h-full items-center md:flex-row md:items-start">
        {/* 미리보기 */}
        <div className="relative basis-[300px] min-w-[300px] min-h-[300px] max-w-[500px] max-h-[500px] flex items-center flex-col md:mr-4">
          <h2 className="text-center font-bold text-lg mb-2">미리보기</h2>
          <div className="relative flex-1 w-full max-w-[500px] max-h-[500px] border-4 border-amber-300 rounded bg-black">
            {backImg && (
              <img
                className="absolute top-0 left-0 w-full h-full z-0"
                src={backImg?.src ?? ''}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = 'images/default_logo.png';
                }}
                ref={imgRef}
              />
            )}

            <canvas
              className="absolute top-0 left-0 w-full h-full z-10"
              ref={canvasTextRef}
              width={500}
              height={500}
            ></canvas>
          </div>
        </div>

        {/* 입력폼 */}
        <div className="w-full flex-1">
          <h2 className="text-center font-bold text-lg mb-2">프리셋</h2>
          <div className="border-2 border-amber-500 w-full p-2 rounded">
            <form onSubmit={handleSubmit(onOpen)}>
              <label className="mb-2">
                <span>첫줄</span>
                <input
                  type="text"
                  name="첫줄"
                  className="input mb-2"
                  onChange={onTextChange}
                  value={text}
                />
              </label>
              <label>
                <span>두번쨰 줄</span>
                <input
                  type="text"
                  name="두번째줄"
                  className="input"
                  onChange={onTextChange}
                  value={text2}
                />
              </label>

              <InputImg onUpdate={onUpdate} />
              <button
                className="btn-md btn-secodary rounded-full py-1 mt-2 bg-amber-500"
                type="submit"
              >
                저장하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Canvas;
