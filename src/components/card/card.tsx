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
    <li className={styles.card}>
      <div className={styles.card__img}>
        <img className="w-full" src={url} alt="profile photo" />
      </div>
      <div className={styles.card__text}>
        <h1 className="text-2xl font-bold font-display">{name}</h1>
        <p className="text-base font-semibold font-display">{company}</p>
        <hr className="border-0 h-0.5 bg-emerald-300 my-2" />
        <p>{message}</p>
        <p>{title}</p>
        <p>{email}</p>
      </div>
    </li>
  );
};

export default Card;
