import { atom, selector } from 'recoil';
import AuthServices from '../services/auth_services';
import firebase from 'firebase';

const localUser = localStorage.getItem('user');
const user = localUser && JSON.parse(localUser);

export const authServiceAtom = atom({
  key: 'AuthServices',
  default: new AuthServices(),
});

export const userAtom = atom<null | firebase.User>({
  key: 'user',
  default: user,
});
