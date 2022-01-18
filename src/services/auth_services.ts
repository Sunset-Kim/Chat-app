import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';

class AuthServices {
  // login
  loginSocial(providerName: 'google' | 'github') {
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

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
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

  join(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  changeProfile(displayName: string, photoURL: string) {
    if (!auth.currentUser) return;
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  }
}

export default AuthServices;
