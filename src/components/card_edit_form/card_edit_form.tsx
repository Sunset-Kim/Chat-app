import React, { ReactEventHandler, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { cardsAtom, ICardInfo } from '../../state/data';
import './card_edit_form.module.css';

interface CardEditFormProps {
  card: ICardInfo;
}

const CardEditForm: React.FC<CardEditFormProps> = ({ card }) => {
  const [cards, setCards] = useRecoilState(cardsAtom);
  const currentCard = cards && cards[`${card.id}`];
  const { register } = useForm();

  if (currentCard) {
    const { id, name, message, email, company, fileName, fileURL } =
      currentCard;

    const onDelete = useCallback<
      (e: React.SyntheticEvent<HTMLButtonElement>) => void
    >(e => {
      e.preventDefault();
      setCards(prev => {
        if (!prev) return prev;

        const newArray = { ...prev };
        console.log(newArray);
        delete newArray[id];

        return newArray;
      });
    }, []);

    const onChange = useCallback<
      (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    >(e => {
      const currentValue = e.currentTarget.value;
      const currentName = e.currentTarget.name as keyof ICardInfo;

      setCards(prev => {
        const updated = { ...prev };
        updated[card.id] = { ...currentCard, [currentName]: currentValue };
        console.log(updated[card.id]);
        return updated;
      });
    }, []);

    return (
      <div className="w-full p-2 mb-4 border">
        <form className="w-full flex flex-col">
          <div className="flex">
            <label className="flex-1 flex items-center">
              <span className="sr-only ">Name</span>
              <span className="px-2 text-sm">name</span>
              <input
                className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
                type="text"
                name="name"
                value={name}
                onChange={onChange}
              />
            </label>
            <label className="flex-1 flex items-center">
              <span className="sr-only">Name</span>
              <span className="px-2 text-sm">company</span>
              <input
                {...register('company')}
                className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Company here"
                type="text"
                name="company"
                value={company}
                onChange={onChange}
              />
            </label>
            <select className="flex-1 rounded-lg pl-2 border-2 border-transparent focus:border-sky-500 focus:outline-none">
              <option value="drak">drak</option>
            </select>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full h-full resize-none rounded border-2 bg-white focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 px-3 py-2"
              name="message"
              cols={30}
              rows={5}
              value={message}
              onChange={onChange}
            ></textarea>
          </div>

          <div className="flex-1 flex">
            <label className="flex-1 basis-1/2">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                name="file"
                className="text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100 file:cursor-pointer cursor-pointer"
              />
            </label>
            <button className="btn-delete flex-1 basis-1/3" onClick={onDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  } else return null;
};

export default CardEditForm;
