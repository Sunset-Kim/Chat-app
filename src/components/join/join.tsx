import { motion } from 'framer-motion';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import { authServiceAtom } from '../../state/auth';
import { storeAtom } from '../../state/data';

const Join = () => {
  const authServices = useRecoilValue(authServiceAtom);
  const storeSevices = useRecoilValue(storeAtom);
  const { register, handleSubmit, formState, setError } = useForm();

  const onSubmit: SubmitHandler<HTMLFormElement> = data => {
    if (!data.email || !data.password || !data.passwordConfirm) return;
    if (data.password !== data.passwordConfirm)
      return setError(
        'passwordConfirm',
        { message: '비밀번호가 서로 맞지 않습니다.' },
        { shouldFocus: true },
      );

    authServices
      .join(data.email, data.password)
      .then(result => {
        const id = result.user.uid;
        const name = result.user.displayName ?? 'default';
        const img = result.user.photoURL ?? '';
        storeSevices.setProfile(id, name as string, img);
      })
      .catch(error => {
        const message = error.message;
        setError('entire', { message });
      });
  };

  return (
    <form className="flex flex-col p-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <input
          className="w-full input"
          placeholder="email"
          type="email"
          {...register('email', { required: '필수 항목입니다.' })}
        />
        {formState.errors.email?.message ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="input-error pl-1"
          >
            {formState.errors.email.message}
          </motion.p>
        ) : null}
      </div>

      <div className="mb-2">
        <input
          {...register('password', {
            required: '필수항목입니다',
            minLength: {
              value: 8,
              message: '8글자 이상 입력해주세요',
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: '하나의 이상의 문자,숫자,특수문자를 포함해야 합니다',
            },
          })}
          className="input w-full peer"
          type="password"
          placeholder="password"
        />

        {formState.errors.password?.message ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="input-error pl-1"
          >
            {formState.errors.password.message}
          </motion.p>
        ) : null}
      </div>

      <div className="mb-2">
        <input
          {...register('passwordConfirm', {
            required: '필수항목입니다',
            minLength: {
              value: 8,
              message: '8글자 이상 입력해주세요',
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: '하나의 이상의 문자,숫자,특수문자를 포함해야 합니다',
            },
          })}
          className="input w-full peer"
          type="password"
          placeholder="password"
        />

        {formState.errors.passwordConfirm?.message ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="input-error pl-1"
          >
            {formState.errors.passwordConfirm.message}
          </motion.p>
        ) : null}

        {formState.errors.entire?.message ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="input-error pl-1"
          >
            {formState.errors.entire.message}
          </motion.p>
        ) : null}
      </div>

      <button
        className="block btn-md btn-primary rounded-sm mb-2 bg-amber-500"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
};

export default Join;
