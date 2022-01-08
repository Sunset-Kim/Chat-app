import { auth } from 'firebase';

class AuthServices {
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
    return auth().signInWithPopup(authProvider);
  }
}

export default AuthServices;
