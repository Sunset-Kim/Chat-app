import React from 'react';
import { ICardInfo } from '../../state/data';
import styles from './card.module.css';

interface CardProps {
  card: ICardInfo;
}

const DEFAULT_IMG = '/images/default_logo.png';

const Card: React.FC<CardProps> = ({ card }) => {
  const { title, name, id, company, theme, fileURL, fileName, message, email } =
    card;
  const url = fileURL || DEFAULT_IMG;
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
            <h3 className="text-lg font-bold mr-2">유저이름</h3>
            <span className="text-sm text-neutral-500 tracking-tighter">
              오후 0: 00
            </span>
          </div>

          {/* 이미지 */}
          <div className="flex">
            <figure className="max-w-sm mb-4">
              <figcaption>{fileName}</figcaption>
              <img
                className="w-full max-h-80 object-scale-down"
                src={url}
                alt="profile photo"
              />
            </figure>
          </div>

          <p className="leading-7">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            deleniti sapiente dicta, sunt cumque maxime quia. Labore veritatis,
            repudiandae beatae hic maxime sequi dicta dolore placeat distinctio
            praesentium voluptas dolor.
          </p>
        </div>
      </div>
    </li>
  );
};

export default Card;
