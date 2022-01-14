import React, { useState, memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { DatabaseService } from '../../services/card_repository';
import { userIdAtom } from '../../state/auth';
import { ICardInfo } from '../../state/data';
import { isImgLoadingAtom } from '../../state/uploader';
import InputFile from '../input_file/input_file';

const CardAddForm = () => {
  const [file, setFile] = useState<{
    fileName: string;
    fileURL: string;
  } | null>(null);
  const userId = useRecoilValue(userIdAtom);
  const isImgLoading = useRecoilValue(isImgLoadingAtom);
  const { handleSubmit, register, reset } = useForm();
  const databaseService = new DatabaseService();

  const onSubmit: SubmitHandler<HTMLFormElement> = data => {
    if (isImgLoading) return alert('이미지를 업로드 하는 중입니다.');
    if (!userId) return alert('로그인 정보 오류');

    const cardInfo: ICardInfo = {
      id: Date.now(),
      title: data.title ?? '',
      theme: data.theme ?? '',
      name: data.name ?? '',
      company: data.company ?? '',
      email: data.email ?? '',
      message: data?.message ?? '',
      fileName: file?.fileName ?? '',
      fileURL: file?.fileURL ?? '',
    };

    databaseService.addCard(userId, cardInfo);

    reset();
    setFile(null);
  };

  const onFileChange: (fileName: string, url: string) => void = (
    fileName,
    fileURL,
  ) => {
    setFile({ fileName, fileURL });
  };

  return (
    <div>
      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <label className="flex-1 flex items-center">
            <span className="sr-only ">Name</span>
            <span className="px-2 text-sm">name</span>
            <input
              {...register('name')}
              className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm invalid:border-red-400"
              placeholder="name"
              type="text"
              required
            />
          </label>
          <label className="flex-1 flex items-center">
            <span className="sr-only">Name</span>
            <span className="px-2 text-sm">company</span>
            <input
              {...register('company')}
              className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="company"
              type="text"
            />
          </label>
          <select
            {...register('theme')}
            className="flex-1 rounded-lg pl-2 border-2 border-transparent focus:border-sky-500 focus:outline-none"
          >
            <option value="drak">drak</option>
          </select>
        </div>
        <div className="flex-1">
          <textarea
            {...register('message')}
            className="w-full h-full resize-none rounded border-2 bg-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 px-3 py-2 invalid:ring-2 invalid:ring-red-400"
            name="message"
            cols={30}
            rows={5}
            required
          ></textarea>
        </div>

        <div className="flex-1 flex">
          <InputFile fileName={file?.fileName} onFileChange={onFileChange} />
          <button className="btn-delete flex-1 basis-1/3" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CardAddForm);
