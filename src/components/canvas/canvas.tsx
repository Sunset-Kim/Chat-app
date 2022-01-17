import { async } from '@firebase/util';
import React, {
  ReactEventHandler,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { v1 as uuid } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import StorageService from '../../services/storage';
import InputImg from '../input_img/input_img';
import { getDownloadURL } from 'firebase/storage';
import { useRecoilValue } from 'recoil';
import { userIdAtom } from '../../state/auth';
import StoreService from '../../services/fire_store';
const Canvas = () => {
  // service
  const storageService = new StorageService();
  const storeService = new StoreService();

  // recoil value
  const userID = useRecoilValue(userIdAtom);

  // state
  const [text, setText] = useState<string>('');
  const [fileURL, setFileURL] = useState<string | ArrayBuffer>('');
  const [backImg, setBackImg] = useState<HTMLImageElement | undefined>();
  const [uploadImg, setUploadImg] = useState('');
  const { handleSubmit } = useForm();

  // ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasTextRef = useRef<HTMLCanvasElement>(null);

  // custom function
  const onUpdate = useCallback(
    (url: string | ArrayBuffer) => setFileURL(url),
    [],
  );

  const onTextChange: ReactEventHandler<HTMLInputElement> = e =>
    setText(e.currentTarget.value);

  const setImg = () => {
    if (!fileURL) return;
    const img = new Image();
    // 이미지 로딩 call back
    img.onload = () => {
      if (!canvasRef.current) return;
      setBackImg(img);
    };
    // url을 src넣기
    img.src = fileURL as string;
  };

  const drawImg = (ref: React.RefObject<HTMLCanvasElement>) => {
    const ctx = ref.current?.getContext('2d');
    ctx?.clearRect(0, 0, 300, 300);
    if (!backImg) return;
    ctx?.drawImage(backImg, 0, 0, 300, 300);
  };

  const drawText = (ref: React.RefObject<HTMLCanvasElement>, text: string) => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 300, 300);
    ctx.textAlign = 'center';
    ctx.font = '20px Aria';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText(text, 150, 230, 300);
    ctx.strokeText(text, 150, 230, 300);
  };

  const onUpload: SubmitHandler<any> = async (data: any) => {
    if (!canvasTextRef.current || !userID) return;
    const ctx = canvasTextRef.current.getContext('2d');
    if (!ctx || !backImg) return;
    ctx.globalCompositeOperation = 'destination-over';
    drawText(canvasTextRef, text);
    ctx.drawImage(backImg, 0, 0, 300, 300);

    // 확인
    const save = confirm('저장합니다 아시겠어요?');
    if (!save) return;
    const base64 = canvasTextRef.current.toDataURL('image/jpeg');
    setUploadImg(prev => {
      if (prev === base64) {
        alert('같은파일');
        return prev;
      } else {
        return base64;
      }
    });
  };

  const storageUpload = async () => {
    if (!userID) return;
    const results = await storageService.uploadImg(uploadImg, uuid());
    const imgURL = await getDownloadURL(results.ref);
    const imageData = {
      userID: userID,
      imgURL,
      createAt: Date.now().toString(),
    };

    storeService.uploadImages(imageData).then(() => {
      alert('저장성공');
      setText('');
      setFileURL('');
      setBackImg(undefined);
      setUploadImg('');
    });
  };

  useEffect(() => {
    setImg();
  }, [fileURL]);

  useEffect(() => {
    drawImg(canvasRef);
  }, [backImg]);

  useEffect(() => {
    drawText(canvasTextRef, text);
  }, [text]);

  useEffect(() => {
    storageUpload();
  }, [uploadImg]);

  return (
    <section className="flex w-full h-full">
      <div className="relative shrink-0 basis-[350px] h-full mr-4 flex items-center flex-col">
        <h1 className="text-center font-bold text-lg mb-2">프리뷰</h1>
        <div className="relative w-[330px] h-[330px] border-2 border-rose-400 rounded">
          <canvas
            className="absolute top-[15px] left-[15px]"
            ref={canvasRef}
            width={300}
            height={300}
          ></canvas>
          <canvas
            className="absolute top-[15px] left-[15px]"
            ref={canvasTextRef}
            width={300}
            height={300}
          ></canvas>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-center font-bold text-lg mb-2">프리셋</h1>
        <div className="border-2 border-rose-500 w-full p-2 rounded">
          <form onSubmit={handleSubmit(onUpload)}>
            <label htmlFor="text1">첫줄</label>
            <input
              type="text"
              className="input"
              onChange={onTextChange}
              value={text}
            />
            <InputImg onUpdate={onUpdate} />
            <button
              className="btn-md btn-primary rounded-full py-1 mt-2 bg-rose-500"
              type="submit"
            >
              저장하기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Canvas;
