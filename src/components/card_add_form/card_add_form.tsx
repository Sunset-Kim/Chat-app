import React, { ReactEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { cardsAtom, ICardInfo } from '../../state/data';

const CardAddForm = () => {
  const [cards, setCards] = useRecoilState(cardsAtom);

  const onSubmit: SubmitHandler<HTMLFormElement> = data => {
    console.log(data, '등록');

    const cardInfo: ICardInfo = {
      id: Date.now(),
      title: data.title,
      theme: data.theme,
      name: data.name,
      fileName: data.picture.length > 0 && data.picture[0].name,
      fileURL: data.picture.length > 0 && data.picture[0],
      company: data.company,
      email: data.email,
      message: data?.message,
    };

    const newCard: { [key: string]: ICardInfo } = {};
    newCard[`${cardInfo.id}`] = cardInfo;

    setCards(prev => {
      if (prev) {
        return { ...prev, ...newCard };
      } else {
        return { ...newCard };
      }
    });
  };
  const { handleSubmit, register } = useForm();

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
          <label className="flex-1 basis-1/2">
            <span className="sr-only">Choose profile photo</span>
            <input
              {...register('picture')}
              type="file"
              className="text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 file:cursor-pointer cursor-pointer"
            />
          </label>
          <button className="btn-delete flex-1 basis-1/3" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardAddForm;
