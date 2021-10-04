import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from '@/contexts/Auth';
import Header from '@/components/Header';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  // Get signUp function from the auth context
  const { signUp } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signUp` function from the context
    const { error: errorSignUp } = await signUp({ email, password });

    if (errorSignUp) {
      setError({
        isError: true,
        message: errorSignUp.message,
      });
      toast.error(error.message);
      console.log(error.message);
    } else {
      console.log(username);
      // Redirect user to Dashboard
      history.push('/dashboard');
    }
  }

  return (
    <main>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-4 w-full'
        >
          <label htmlFor='input-email' className='font-bold text-dark'>
            Email
          </label>
          <input id='input-email' type='email' ref={emailRef} />

          <label htmlFor='input-password' className='font-bold text-dark'>
            Password
          </label>
          <input id='input-password' type='password' ref={passwordRef} />

          <br />

          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400'
          >
            Sign up
          </button>
        </form>
        <p>
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
