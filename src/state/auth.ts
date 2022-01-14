import { atom, selector } from 'recoil';
import AuthServices from '../services/auth_services';
import { User } from 'firebase/auth';

const localUser = localStorage.getItem('user');
const user = localUser && JSON.parse(localUser);

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
