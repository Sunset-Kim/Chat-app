import React, { ReactEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authServiceAtom, userAtom } from '../../state/auth';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const authService = useRecoilValue(authServiceAtom);

  const onLogin: ReactEventHandler<HTMLButtonElement> = e => {
    const loginType = e.currentTarget.dataset.login as 'google' | 'github';
    authService
      .login(loginType)
      ?.then(result => {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
      })
      .catch(error => console.log('로그인 에러', error));
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      user && navigate('/');
    });
  }, []);

  return (
    <section>
      <div className="fixed bg-neutral-900/75 top-0 right-0 left-0 bottom-0 z-40" />

      <section className="fixed text-neutral-800 bg-neutral-200 border-2 border-rose-900 m-auto right-0 left-0 top-0 bottom-0 max-w-md max-h-128 w-full h-max z-50 rounded-lg p-8">
        <h1 className="font-bold text-center mb-4 text-lg">로그인</h1>
        {/* login form */}
        <form className="flex flex-col mb-3">
          <div className="mb-2">
            <input
              className="w-full input peer"
              type="text"
              placeholder="e-mail"
              required
            />
            <p className="peer-invalid:visible input-error pl-1">
              이메일을 입력해주세요
            </p>
          </div>

          <div className="mb-2">
            <input
              className="input w-full peer"
              type="password"
              placeholder="password"
              required
            />
            <p className="peer-invalid:visible input-error pl-1">
              비밀번호를 입력해주세요
            </p>
          </div>

          <button className="block btn-md btn-primary rounded-sm">Login</button>
        </form>

        <ul>
          <li className="mb-1">
            <button
              className="block w-full btn-md btn-ghost rounded-full"
              onClick={onLogin}
              data-login="google"
            >
              Google Login
            </button>
          </li>
          <li>
            <button
              className="block w-full btn-md btn-ghost rounded-full"
              onClick={onLogin}
              data-login="github"
            >
              Github Login
            </button>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default Login;
