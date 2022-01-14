import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

class AuthServices {
  // login
  login(providerName: 'google' | 'github') {
    // 1. provider 선택
    let authProvider;
    switch (providerName) {
      case 'google':
        authProvider = new GoogleAuthProvider();
        break;
      case 'github':
        authProvider = new GithubAuthProvider();

        break;
      default:
        throw 'Auth Provider not exist';
        break;
    }

    if (!authProvider) return;

    return signInWithPopup(auth, authProvider);
  }

  // logout
  logout() {
    return auth.signOut();
  }

  getUser() {
    return auth.currentUser;
  }

  onAuthChange(onUserChanged: (user: User | null) => void) {
    onAuthStateChanged(auth, user => {
      onUserChanged(user);
    });
  }
}

export default AuthServices;
