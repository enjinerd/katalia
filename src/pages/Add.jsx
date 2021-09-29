import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@/contexts/Auth';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Header from '@/components/Header';

export default function Add() {
  const [code, setCode] = useState('');
  const [isVisible, setVisible] = useState(false);

  // Get current user and signOut function from context
  const { user, signOut } = useAuth();
  const history = useHistory();

  function handlePreview(e) {
    setCode(e.target.value);
  }

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <section className='layout w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        {isVisible && (
          <section className='font-semibold flex items-center p-6 justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full shadow-xl'>
            <div className='snipp text-sm'>
              <SyntaxHighlighter
                language='javascript'
                style={materialDark}
                wrapLines
                wrapLongLines
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </section>
        )}
        <section className='flex flex-row items-end justify-end space-x-3'>
          {' '}
          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed'
            onClick={() => setVisible(!isVisible)}
          >
            Preview
          </button>
          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-red-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-red-400 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            Reset
          </button>
        </section>
        <form className='flex flex-col space-y-4 w-full'>
          <label htmlFor='input-email' className='font-bold text-dark'>
            Title
          </label>
          <input id='input-email' type='email' />

          <label htmlFor='input-code' className='font-bold text-dark'>
            Code
          </label>
          <input
            id='input-code'
            type='text'
            onChange={(e) => handlePreview(e)}
          />

          <label htmlFor='input-desc' className='font-bold text-dark'>
            Description
          </label>
          <textarea id='input-desc' type='text' />

          <br />

          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
