import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@/contexts/Auth';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useForm, useFormState } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';

export default function Add() {
  const {
    register,
    getValues,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      code: '',
      name: '',
    },
  });
  const watchCodeFields = watch('code'); // you can also target specific fields by their names

  const [isVisible, setVisible] = useState(false);

  // Get current user and signOut function from context
  const { user, signOut } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    const code = getValues('code');
    const title = getValues('title');
    const desc = getValues('desc');

    console.log(errors);
  };

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);
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
                {watchCodeFields}
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
            {isVisible ? 'Close Preview' : 'Preview'}
          </button>
          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-red-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-red-400 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            Reset
          </button>
        </section>
        <form className='flex flex-col space-y-4 w-full'>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='input-title' className='font-bold text-dark'>
              Title
            </label>
            <input
              name='title'
              id='title'
              type='text'
              {...register('title', {
                required: 'Required',
                maxLength: {
                  value: 25,
                  message: '25 char max',
                },
                minLength: { value: 9, message: '9 char min' },
              })}
              className={errors?.title && 'border border-red-500 bg-red-100'}
              defaultValue={getValues('title')}
            />

            {errors?.title && errors?.title.type == 'required' ? (
              <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
            ) : null}
            {errors?.title && errors?.title.type == 'minLength' ? (
              <p tw='text-red-500 text-sm'>🚨 {errors?.title.message}!</p>
            ) : null}
          </div>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='input-code' className='font-bold text-dark'>
              Code
            </label>
            <input
              name='code'
              id='code'
              type='text'
              {...register('code', {
                required: 'Required',
                maxLength: {
                  value: 55,
                  message: '55 char max',
                },
                minLength: { value: 15, message: '15 char min' },
              })}
              className={errors?.code && 'border border-red-500 bg-red-100'}
              defaultValue={getValues('code')}
            />

            {errors?.code && errors?.code.type == 'required' ? (
              <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
            ) : null}
            {errors?.code && errors?.code.type == 'minLength' ? (
              <p tw='text-red-500 text-sm'>🚨 {errors?.code.message}!</p>
            ) : null}
          </div>{' '}
          <div className='flex flex-col space-y-2'>
            <label htmlFor='input-desc' className='font-bold text-dark'>
              Description
            </label>
            <textarea id='input-desc' type='text' />
          </div>
          <br />
          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed'
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </form>
      </section>
      <Toaster />
    </main>
  );
}
