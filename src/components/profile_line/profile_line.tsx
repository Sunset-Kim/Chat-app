import { SDK_VERSION } from 'firebase/app';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../state/auth';

interface ProfileLineProps {
  text?: string;
}

const ProfileLine: React.FC<ProfileLineProps> = ({ text }) => {
  const user = useRecoilValue(userAtom);

  if (user) {
    return (
      <div className="flex items-center">
        <div className="w-12 h-12 rounded bg-rose-600 overflow-hidden mr-2">
          <img
            className="w-full h-full"
            src={user.photoURL ?? `images/default_logo.png`}
            alt="user profile"
          />
        </div>
        <span className="flex-1 font-semibold">
          {`${user.displayName}${text}`}
        </span>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ProfileLine;
