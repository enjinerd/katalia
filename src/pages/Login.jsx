import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '@/contexts/Auth';
import Header from '@/components/Header';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isDisabled, setDisabled] = useState(false);

  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  // Get signUp function from the auth context
  const { signIn } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signIn` function from the context
    const { error: errorSignIn } = await signIn({ email, password });

    if (errorSignIn) {
      setError({
        isError: true,
        message: errorSignIn.message,
      });
      toast.error(error.message);
      setDisabled(false);
      console.log(error.message);
    } else {
      // Redirect user to Dashboard
      history.push('/dashboard');
    }
  }

  return (
    <main>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        {error.isError && (
          <p className='text-lg font-bold text-red-500'>{error.message}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-4 w-full'
        >
          <label htmlFor='input-email' className='font-bold text-dark'>
            Email
          </label>
          <input
            id='input-email'
            type='email'
            ref={emailRef}
            className={error.isError && 'border border-red-500 bg-red-100'}
          />

          <label htmlFor='input-password' className='font-bold text-dark'>
            Password
          </label>
          <input
            id='input-password'
            type='password'
            ref={passwordRef}
            className={error.isError && 'border border-red-500 bg-red-100'}
          />

          <br />

          <button
            type='submit'
            className='disabled px-4 py-2 font-bold text-white bg-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed'
            disabled={isDisabled}
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to='/signup' className='font-bold text-dark'>
            Sign Up
          </Link>
        </p>
      </section>
      <Toaster />
    </main>
  );
}
