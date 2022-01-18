import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { authServiceAtom } from '../../state/auth';
import { motion } from 'framer-motion';

const Login = () => {
  const authServices = useRecoilValue(authServiceAtom);
  const { register, handleSubmit, formState, setError } = useForm();

  const onSubmit: SubmitHandler<HTMLFormElement> = data => {
    authServices.login(data.email, data.password).catch(error => {
      const errorMessage = error.message;
      setError('entire', { message: errorMessage });
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

      <button className="block btn-md btn-primary rounded-sm mb-2">
        Login
      </button>
    </form>
  );
};

export default Login;
