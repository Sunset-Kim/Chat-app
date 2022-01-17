import React from 'react';
import { IChat } from '../../services/fire_store';
import styles from './card.module.css';

interface CardProps {
  chat: IChat;
}

const DEFAULT_IMG = '/images/default_logo.png';

const Card: React.FC<CardProps> = ({ chat }) => {
  const { userID, message, imgURL, createAt } = chat;
  return (
    <li className="flex">
      {/* 프로필 이미지 */}
      <div className="h-12 w-12 mr-2">
        <img
          className="block w-full h-full object-scale-down object-center bg-rose-200 rounded"
          src="/images/default_logo.png"
          alt="profile"
        />
      </div>

      {/* 본문내용 */}
      <div className="flex-1">
        <div className="">
          {/* 유저이름 시간 */}
          <div className="flex items-center">
            <h3 className="text-lg font-bold mr-2">{userID}</h3>
            <span className="text-sm text-neutral-500 tracking-tighter">
              {createAt}
            </span>
          </div>

          {/* 이미지 */}
          {imgURL && (
            <div className="flex">
              <figure className="max-w-sm mb-4">
                <img
                  className="w-full max-h-80 object-scale-down"
                  src={imgURL}
                  alt="message"
                />
              </figure>
            </div>
          )}

          {message && <p className="leading-7"> {message}</p>}
        </div>
      </div>
    </li>
  );
};

export default Card;
