import React, { ReactEventHandler } from 'react';
import AuthServices from '../../services/auth_services';

const Login = () => {
  const Auth = new AuthServices();

  const onLogin: ReactEventHandler<HTMLButtonElement> = e => {
    const loginType = e.currentTarget.dataset.login as 'google' | 'github';
    Auth.login(loginType);
  };
  return (
    <div>
      <section>
        <div className="overlay fixed bg-slate-900/75 top-0 right-0 left-0 bottom-0 z-40" />

        <section className="fixed m-auto right-0 left-0 top-0 bottom-0 max-w-md max-h-128 w-full h-max bg-gray-100 z-50 rounded-lg p-8">
          <h1 className="font-bold text-center mb-4 text-xl">로그인</h1>
          {/* login form */}
          <form className="flex flex-col mb-3">
            <input className="input peer" type="text" required />
            <input className="input" type="password" required />
            <button className="btn-primary">Login</button>
          </form>

          <ul>
            <li className="mb-1">
              <button
                className="btn-primary w-full"
                onClick={onLogin}
                data-login="google"
              >
                Google Login
              </button>
            </li>
            <li>
              <button
                className="btn-primary w-full"
                onClick={onLogin}
                data-login="github"
              >
                Github Login
              </button>
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default Login;
