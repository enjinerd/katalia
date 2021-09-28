import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '@/contexts/Auth';
import Header from '@/components/Header';
import { split } from '@apollo/client';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // Get signUp function from the auth context
  const { signUp } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = email
      .substring(0, email.lastIndexOf('@'))
      .split('')
      .filter((d) => d !== '_' || d !== '.')
      .join('');

    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password });

    if (error) {
      alert('error signing in');
      console.log(error);
    } else {
      console.log(username);
      // Redirect user to Dashboard
      history.push('/dashboard');
    }
  }

  return (
    <main>
      <Header />
      <section className='layout p-16 space-y-6'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
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
    </main>
  );
}
