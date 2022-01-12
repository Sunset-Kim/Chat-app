import firebase, { auth } from 'firebase';
import app from './firebase';

class AuthServices {
  // login
  login(providerName: 'google' | 'github') {
    // 1. provider 선택
    let authProvider;
    switch (providerName) {
      case 'google':
        authProvider = new auth.GoogleAuthProvider();
        break;
      case 'github':
        authProvider = new auth.GithubAuthProvider();

        break;
      default:
        throw 'Auth Provider not exist';
        break;
    }

    if (!authProvider) return;

    return app.auth().signInWithPopup(authProvider);
  }

  // logout
  logout() {
    return app.auth().signOut();
  }

  getUser() {
    return app.auth().currentUser;
  }

  onAuthChange(onUserChanged: (user: firebase.User | null) => void) {
    app.auth().onAuthStateChanged(user => {
      onUserChanged(user);
    });
  }
}

export default AuthServices;
