import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faCommentDots,
  faImages,
} from '@fortawesome/free-regular-svg-icons';
import { useMatch } from 'react-router-dom';

const Lnb = () => {
  const match = useMatch('/:page');

  return (
    <nav className="bg-rose-300 w-fit py-4 px-4 border-r border-t border-neutral-100/50">
      <ul>
        {/* 채팅 */}
        <li
          className={`nav ${match?.params.page === null ? `bg-rose-800` : ''}`}
        >
          <Link
            to="/"
            className="w-12 h-12 flex items-center justify-center text-3xl"
          >
            <FontAwesomeIcon icon={faCommentDots} />
          </Link>
        </li>
        {/* 메이커 */}
        <li
          className={`nav ${
            match?.params.page === 'maker' ? `bg-rose-800` : ''
          }`}
        >
          <Link
            to="/maker"
            className="w-12 h-12 flex items-center justify-center text-3xl"
          >
            <FontAwesomeIcon icon={faImage} />
          </Link>
        </li>
        {/* 생성기 */}
        <li
          className={`nav ${
            match?.params.page === 'gallery' ? `bg-rose-800` : ''
          }`}
        >
          <Link
            to="/gallery"
            className="w-12 h-12 flex items-center justify-center text-3xl"
          >
            <FontAwesomeIcon icon={faImages} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Lnb;
