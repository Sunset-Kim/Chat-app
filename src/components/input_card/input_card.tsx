import React, { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import InputFile from '../input_file/input_file';

const InputCard = () => {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(false);

  const onUpload: SubmitHandler<HTMLFormElement> = data => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<HTMLFormElement> = error => {
    console.log(error);
  };

  const onFileChange = () => {
    console.log('url을 저장하고 미리보기 보여주기');
  };

  return (
    <div className="bg-amber-500 p-4">
      <h1 className="mb-3">게시물 올리기</h1>
      <form onSubmit={handleSubmit(onUpload, onError)}>
        <div className="flex">
          <div className="w-full">
            <textarea
              className="block w-full h-full rounded resize-none"
              {...register('message')}
              cols={20}
              rows={4}
            />
          </div>
          {
            <figure className="basis-48">
              <figcaption>이미지 미리보기</figcaption>
              <div>
                <img
                  className="w-full h-full"
                  src="/images/default_logo.png"
                  alt=""
                />
              </div>
            </figure>
          }
        </div>
        {/* 글 */}

        {/* 파일 업로드 */}
        <div className="w-28">
          <InputFile onFileChange={onFileChange} />
        </div>

        <div>
          <button className="block ml-auto" type="submit">
            업로드
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputCard;
