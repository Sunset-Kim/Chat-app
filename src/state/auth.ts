import { atom, selector } from 'recoil';
import AuthServices from '../services/auth_services';
import { User } from 'firebase/auth';

const localUser = localStorage.getItem('user');
const user = localUser && JSON.parse(localUser);

export interface IProfile {
  name?: string | null;
  img?: string | null;
}

export const authServiceAtom = atom({
  key: 'AuthServices',
  default: new AuthServices(),
});

export const userAtom = atom<null | User>({
  key: 'user',
  default: user,
  dangerouslyAllowMutability: true,
});

export const userIdAtom = selector({
  key: 'userID',
  get: ({ get }) => get(userAtom)?.uid,
});

export const userProfileAtom = selector({
  key: 'profile',
  get: ({ get }) => {
    const user = get(userAtom);
    if (!user) return;
    return {
      name: user.displayName ?? 'default',
      img: user.photoURL,
    };
  },
});
