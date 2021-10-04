import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from '@/contexts/Auth';
import Header from '@/components/Header';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const [isDisabled, setDisabled] = useState(false);

  const { register, getValues, handleSubmit, errors } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isError, setError] = useState(null);

  // Get signUp function from the auth context
  const { signUp } = useAuth();

  const history = useHistory();

  async function onSubmit() {
    setDisabled(true);

    // Get email and password input values
    const email = getValues('email');
    const password = getValues('password');

    // Calls `signUp` function from the context
    const { error: errorSignUp } = await signUp({ email, password });

    if (errorSignUp) {
      setError(
        'The email has already been registered, try changing it with another email!'
      );
      toast.error(isError);
      setDisabled(false);

      console.log(errorSignUp.message);
    } else {
      // Redirect user to Dashboard
      history.push('/dashboard');
    }
  }

  return (
    <main>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        {isError && (
          <p className='md:text-xl text-lg font-bold text-red-500 font-dm'>
            {isError}
          </p>
        )}
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
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='password'
              className='font-bold text-dark text-lg md:text-xl font-secondary'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              {...register('password', {
                required: 'Password required',
              })}
              className={errors?.password && 'border border-red-500 bg-red-100'}
            />
            {errors?.password && errors?.password.type == 'required' ? (
              <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
            ) : null}
          </div>
          <br />

          <button
            type='submit'
            className='disabled px-4 py-2 font-bold text-white bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed font-dm text-lg md:text-xl'
            disabled={isDisabled}
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </button>
        </form>
        <p className='font-dm md:text-lg'>
          Already have an account?{' '}
          <Link to='/login' className='font-bold text-dark'>
            Log In
          </Link>
        </p>
      </section>
      <Toaster />
    </main>
  );
}
