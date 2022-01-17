import { atom, selector } from 'recoil';
import AuthServices from '../services/auth_services';
import { User } from 'firebase/auth';
import { v1 as uuid } from 'uuid';

const localUser = localStorage.getItem('user');
const user = localUser && JSON.parse(localUser);

export interface IProfile {
  name: string;
  img: string;
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

export const profileAtom = atom<IProfile>({
  key: 'profile',
  default: {
    name: `default+${uuid()}`,
    img: '',
  },
});
