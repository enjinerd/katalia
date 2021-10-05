import React, { useEffect, useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from '@/contexts/Auth';
import Header from '@/components/Header';
import { useForm } from 'react-hook-form';

export default function ForgetPass() {
  const [isDisabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const [accessToken, setAccessToken] = useState('');

  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [isError, setIsError] = useState({
    message: '',
    status: false,
  });

  // Get signUp function from the auth context
  const { forgetPass, updatePass } = useAuth();

  async function onSubmitEmail() {
    setDisabled(true);

    // Get email and password input values
    const email = getValues('email');

    const { error: errorForget } = await forgetPass(email);

    if (errorForget) {
      setIsError("The email din't registered yet");
      toast.error(isError);
      setDisabled(false);

      console.log(errorForget.message);
    } else {
      setSuccess(true);
    }
  }

  const handleChange = (e) => {
    if (e.target.value !== getValues('password')) {
      setIsError({
        message: 'The passwords do not match',
        status: true,
      });
    } else {
      setIsError({
        message: '',
        status: false,
      });
    }
  };

  async function onSubmitUpdate() {
    setDisabled(true);

    // Get email and password input values

    if (!isError.status) {
      const password = getValues('password');

      const { error: errorForget } = await updatePass(accessToken, {
        password,
      });

      if (errorForget) {
        setIsError({
          message: errorForget.message,
          status: true,
        });
        toast.error(isError.message);
        setDisabled(false);
        console.log(errorForget.message);
      } else {
        toast.success('Password updated successfully');
        setSuccess(true);
        history.push('/login');
      }
    } else {
      toast.error(isError.message);
      setDisabled(false);
    }
  }

  useEffect(() => {
    if (location.hash.split('#').filter((e) => e !== '').length > 0) {
      const accessToken = location.hash
        .split('#')
        .filter((e) => e !== '')
        .join('')
        .split('=')
        .filter((e) => e !== 'access_token')
        .join('');

      setAccessToken(accessToken);
    }
  }, [location]);

  return (
    <main>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        {isError.status && (
          <p className='md:text-xl text-lg font-bold text-red-500 font-dm'>
            {isError.message}
          </p>
        )}
        {success && (
          <p className='md:text-xl text-lg font-bold text-green-500 font-dm'>
            Forgot password successful, Please check your email inbox to reset
            password.
          </p>
        )}
        {accessToken && (
          <form className='flex flex-col space-y-4 w-full'>
            <div className='flex flex-col space-y-2'>
              <label
                htmlFor='password'
                className='font-bold text-dark font-secondary text-lg md:text-xl'
              >
                New Password
              </label>
              <input
                id='password'
                type='password'
                {...register('password', {
                  required: 'Password required',
                })}
                className={
                  'font-dm' +
                  (errors?.password &&
                    'border border-red-500 bg-red-100' + 'font-secondary')
                }
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label
                htmlFor='confirmPassword'
                className='font-bold text-dark font-secondary text-lg md:text-xl'
              >
                Confirm New Password
              </label>
              <input
                id='confirmPassword'
                type='password'
                {...register('confirmPassword', {
                  required: 'Confirm Password required',
                })}
                className={
                  'font-dm' +
                  (errors?.confirmPassword &&
                    'border border-red-500 bg-red-100' + 'font-secondary')
                }
                onChange={handleChange}
              />
            </div>

            <br />

            <button
              type='submit'
              className='disabled px-4 py-2 font-bold text-white bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed font-dm text-lg md:text-xl'
              disabled={isDisabled}
              onClick={handleSubmit(onSubmitUpdate)}
            >
              Update Password
            </button>
          </form>
        )}
        {!accessToken && (
          <form className='flex flex-col space-y-4 w-full'>
            <div className='flex flex-col space-y-2'>
              <label
                htmlFor='email'
                className='font-bold text-dark font-secondary text-lg md:text-xl'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                {...register('email', {
                  required: 'Email required',
                })}
                className={
                  'font-dm' +
                  (errors?.email &&
                    'border border-red-500 bg-red-100' + 'font-secondary')
                }
              />
              {errors?.email && errors?.code.email == 'required' ? (
                <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
              ) : null}
            </div>

            <br />

            <button
              type='submit'
              className='disabled px-4 py-2 font-bold text-white bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed font-dm text-lg md:text-xl'
              disabled={isDisabled}
              onClick={handleSubmit(onSubmitEmail)}
            >
              Forget Password
            </button>
          </form>
        )}
      </section>
      <Toaster />
    </main>
  );
}
