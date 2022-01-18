import React, { ReactEventHandler, useEffect, useState } from 'react';
import { IChat } from '../../services/fire_store';
import dayjs from 'dayjs';
import { userIdAtom } from '../../state/auth';
import { useRecoilValue } from 'recoil';
import { storeAtom } from '../../state/data';

interface CardProps {
  chat: IChat;
}

const DEFAULT_IMG = '/images/default_logo.png';

const Card: React.FC<CardProps> = ({ chat }) => {
  const store = useRecoilValue(storeAtom);
  const ID = useRecoilValue(userIdAtom);
  const [name, setName] = useState();
  const [img, setImg] = useState();

  const { userID, message, imgURL, createAt } = chat;

  useEffect(() => {
    store.getProfile(userID).then(snapshot => {
      if (!snapshot.exists()) return;
      const profile = snapshot.data();
      setName(profile.name);
      setImg(profile.img);
    });
  }, [userID]);

  // custom func
  // scr가 없으면 default img로 교체
  const onError: ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src = DEFAULT_IMG;
  };

  return (
    <li className={`flex mb-3`}>
      {/* 프로필 이미지 */}
      <div className="h-12 w-12 mr-2 flex-row-reverse">
        <img
          className="block w-full h-full object-scale-down object-center bg-amber-200 rounded"
          src={img ?? DEFAULT_IMG}
          onError={onError}
          alt="profile"
        />
      </div>

      {/* 본문내용 */}
      <div className="flex-1">
        <div className="">
          {/* 유저이름 시간 */}
          <div className="flex flex-col mb-1 lg:flex-row lg:items-center">
            <h3 className={`text-lg mr-2 ${userID === ID ? 'font-bold' : ''}`}>
              {userID === ID ? `${name} (나)` : name}
            </h3>
            <span className="text-sm text-neutral-500 tracking-tighter">
              {dayjs(createAt).format('YYYY년 MM월 DD일 h:mm A')}
            </span>
          </div>
          <div>
            {/* 이미지 */}
            {imgURL && (
              <div className="flex w-[150px] h-[150px] rounded-lg overflow-hidden lg:w-[300px] lg:h-[300px] transition-all">
                <img
                  className="w-full h-full object-scale-down"
                  src={imgURL}
                  alt="message"
                />
              </div>
            )}

            {message && (
              <p className="leading-5 whitespace-pre-line"> {message}</p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
