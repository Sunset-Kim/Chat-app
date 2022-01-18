import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faCommentDots,
  faImages,
} from '@fortawesome/free-regular-svg-icons';

const Lnb = () => {
  return (
    <nav className="bg-sky-500 w-24 p-6 border-r border-t border-neutral-100/50">
      <ul>
        {/* 채팅 */}
        <li className="mb-4 rounded bg-sky-700">
          <Link
            to="/"
            className="w-12 h-12 flex items-center justify-center text-3xl"
          >
            <FontAwesomeIcon icon={faCommentDots} />
          </Link>
        </li>
        {/* 메이커 */}
        <li className="mb-4 rounded bg-sky-700">
          <Link
            to="/maker"
            className="w-12 h-12 flex items-center justify-center text-3xl"
          >
            <FontAwesomeIcon icon={faImage} />
          </Link>
        </li>
        {/* 생성기 */}
        <li className="mb-4 rounded bg-sky-700">
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
