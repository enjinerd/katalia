import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_SPECIFIC_DATA,
  UPDATE_SNIPPET,
  DELETE_SNIPPET,
} from '@/graphql/gql';
import { useHistory, useParams } from 'react-router';
import { CopyBlock, dracula } from 'react-code-blocks';
import useClipboard from 'react-use-clipboard';
import { exportComponentAsJPEG } from 'react-component-export-image';
import '@/pages/styles/Snippet.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/contexts/Auth';
import EditorCode from '@/components/Editor';
import { useForm, useFormState } from 'react-hook-form';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function Snippet(props) {
  const { snip } = useParams();
  const history = useHistory();
  const [getSnippet, { data, error }] = useLazyQuery(GET_SPECIFIC_DATA, {
    variables: {
      id: snip,
    },
  });
  const [deleteSnippet] = useMutation(DELETE_SNIPPET);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);

  const snippetRef = useRef();
  const { user } = useAuth();
  const [isEditor, setEditor] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [code, setCode] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const { register, getValues, handleSubmit } = useForm();

  const handleUpdate = () => {
    console.log(getValues('title'));
    setVisible(!isVisible);
    updateSnippet({
      variables: {
        id: snip,
        updatedSnippet: code,
        updatedTitle: getValues('title'),
      },
      refetchQueries: [
        {
          query: GET_SPECIFIC_DATA,
          variables: {
            id: snip,
          },
        },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConfirm = () => {
    setOpen(!isOpen);
    deleteSnippet({
      variables: {
        id: snip,
      },
    })
      .then((res) => {
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSnippet();
    if (data?.katalia_snippet_by_pk?.Snip_REL_aggregate?.nodes?.length > 0) {
      setCode(data?.katalia_snippet_by_pk?.snippet);
      if (
        data?.katalia_snippet_by_pk?.Snip_REL_aggregate?.nodes[0].email ===
        user?.email
      ) {
        setEditor(true);
      }
    }
  }, [data]);

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      {data?.katalia_snippet_by_pk ? (
        <section className='content  p-12 space-y-6 flex flex-col items-center'>
          {isVisible ? (
            <input
              className='text-2xl font-bold p-2 font-secondary'
              name='title'
              id='title'
              type='text'
              {...register('title', {
                required: 'Required',
                minLength: { value: 9, message: '9 char min' },
              })}
              defaultValue={data?.katalia_snippet_by_pk?.title}
              onChange={() => setDisabled(false)}
            />
          ) : (
            <p className='font-bold text-2xl capitalize font-secondary'>
              {data?.katalia_snippet_by_pk.title}
            </p>
          )}
          <div className='btn-group flex flex-row space-x-4 items-end font-dm'>
            {!isVisible && (
              <button
                className='px-3 py-1 text-sm md:text-base md:px-3 md:py-2 font-bold text-white capitalize bg-green-600 w-'
                onClick={() => exportComponentAsJPEG(snippetRef)}
              >
                Export as Image
              </button>
            )}

            <div className='space-x-3'>
              {isEditor && (
                <button
                  className='px-3 py-1 text-sm md:text-base md:px-3 md:py-2 font-bold text-white capitalize bg-green-600 w-'
                  onClick={() => {
                    setVisible(!isVisible);
                    setDisabled(true);
                  }}
                >
                  {isVisible ? 'Cancel' : 'Edit Snippet'}
                </button>
              )}
              {isVisible && (
                <button
                  className='disabled px-3 py-1 text-sm md:text-base md:px-3 md:py-2 font-bold text-white bg-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed'
                  disabled={isDisabled}
                  onClick={handleSubmit(handleUpdate)}
                >
                  Update
                </button>
              )}
              {isVisible && (
                <ConfirmDialog
                  isOpen={isOpen}
                  setOpen={setOpen}
                  handleConfirm={handleConfirm}
                  title='Delete Snippet?'
                  message='Are you sure you want to delete this snippet?'
                  titleAction='Delete Snippet'
                  className='disabled px-3 py-1 text-sm md:text-base md:px-3 md:py-2 font-bold text-white bg-red-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-red-400 disabled:opacity-60 disabled:cursor-not-allowed'
                />
              )}
            </div>
          </div>
          {isVisible && (
            <div className='px-3 py-1 bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-600'>
              <p className='text-base font-bold text-white font-secondary'>
                Click code area to edit this snippet
              </p>
            </div>
          )}
          <section
            className='font-medium flex items-center p-6 justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 md:w-2/4 shadow-xl'
            ref={snippetRef}
          >
            <div className='snipp text-base bg-dark'>
              {isVisible ? (
                <EditorCode
                  code={code}
                  onChange={(code) => {
                    setCode(code);
                    setDisabled(false);
                  }}
                />
              ) : (
                <CopyBlock
                  text={data?.katalia_snippet_by_pk.snippet}
                  language='javascript'
                  showLineNumbers
                  theme={dracula}
                  codeBlock
                />
              )}
            </div>
          </section>{' '}
          <div className='flex flex-row text-left  text-white space-x-3 items-center justify-center'>
            <p className='font-bold text-lg rounded-lg px-3 py-2 bg-dark font-secondary'>
              {data?.katalia_snippet_by_pk.username}
            </p>
            <button
              className='px-4 py-2 font-bold text-white capitalize bg-green-600 text-lg md:text-xl font-dm'
              onClick={() => exportComponentAsJPEG(snippetRef)}
            >
              Up
            </button>
            <p className='text-dark font-bold'> 15</p>
            <button
              className='px-4 py-2 font-bold text-white capitalize bg-red-600 text-lg md:text-xl font-dm'
              onClick={() => exportComponentAsJPEG(snippetRef)}
            >
              Down
            </button>
            <p className='text-dark font-bold'> 15</p>
          </div>
        </section>
      ) : (
        <section className=' flex justify-center items-center p-12'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900'></div>
        </section>
      )}
      <Toaster />
    </main>
  );
}
