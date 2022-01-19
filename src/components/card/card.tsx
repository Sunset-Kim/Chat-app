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
        <div>
          {/* 유저이름 시간 */}
          <div className="flex flex-col mb-2 lg:flex-row lg:items-center">
            <h3 className={`text-lg mr-2 ${userID === ID ? 'font-bold' : ''}`}>
              {userID === ID ? `${name} (나)` : name}
            </h3>
            <span className="text-sm text-neutral-500 tracking-tighter">
              {dayjs(createAt).format('YYYY년 MM월 DD일 h:mm A')}
            </span>
          </div>

          {/* 메세지 */}
          <div>
            {message && (
              <p className="leading-5 whitespace-pre-line mb-2"> {message}</p>
            )}
            {/* 이미지 */}
            {imgURL && (
              <details className="flex open:bg-amber-300 w-fit open:p-2 rounded-lg transition-all">
                <summary className="text-sm border-b px-2 py-1 border-amber-600 text-neutral-800">
                  이미지가 있습니다!
                </summary>
                <img
                  className="mt-2 w-[150px] h-[150px] rounded-lg border border-amber-600 overflow-hidden lg:w-[250px] lg:h-[250px] transition-all"
                  src={imgURL}
                  alt="message"
                />
              </details>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
