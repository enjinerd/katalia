import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

import { useHistory } from 'react-router';
import { useAuth } from '@/contexts/Auth';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useForm, useFormState } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { ADD_SNIPPET } from '@/graphql/gql';
import { customAlphabet } from 'nanoid';

import Header from '@/components/Header';
import { useSelector } from 'react-redux';

export default function Add() {
  const [addSnippet] = useMutation(ADD_SNIPPET);
  const nanoid = customAlphabet('1234567890abcdefghxr', 5);
  const { username } = useSelector((state) => state.data);
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const highlight = (code) => (
    <Highlight {...defaultProps} theme={theme} code={code} language='jsx'>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );
  const styles = {
    root: {
      boxSizing: 'border-box',
      fontFamily: '"Space Mono", "Fira Code", monospace',
      fontWeight: '600',
      ...theme.plain,
    },
  };
  const { register, getValues, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      code: '',
      name: '',
    },
  });

  // Get current user and signOut function from context
  const { user, signOut } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    const title = getValues('title');
    const desc = getValues('desc');
    await addSnippet({
      variables: {
        id: nanoid(),
        snippet: code,
        title,
        desc,
        username,
      },
    });
  };

  const handleReset = () => {
    reset('');
    setCode('');
  };

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
    console.log(username);
  }, [errors]);

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        <section className='flex flex-row items-end justify-end space-x-3'>
          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-red-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-red-400 disabled:opacity-60 disabled:cursor-not-allowed font-dm md:text-lg'
            onClick={handleReset}
          >
            Reset
          </button>
        </section>
        <form className='flex flex-col space-y-4 w-full'>
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='input-title'
              className='font-bold text-dark text-lg md:text-xl font-secondary'
            >
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
            <label
              htmlFor='input-code'
              className='font-bold text-dark text-lg md:text-xl font-secondary'
            >
              Code
            </label>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={highlight}
              padding={10}
              style={styles.root}
            />
            {errors?.code && errors?.code.type == 'required' ? (
              <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
            ) : null}
            {errors?.code && errors?.code.type == 'minLength' ? (
              <p tw='text-red-500 text-sm'>🚨 {errors?.code.message}!</p>
            ) : null}
          </div>{' '}
          <br />
          <button
            type='submit'
            className='px-4 py-2 font-bold text-white bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed font-dm md:text-lg'
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
