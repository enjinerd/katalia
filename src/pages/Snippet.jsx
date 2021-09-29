import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { useQuery } from '@apollo/client';
import { GET_SPECIFIC_DATA } from '@/graphql/gql';
import { useParams } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useClipboard from 'react-use-clipboard';
import { exportComponentAsJPEG } from 'react-component-export-image';
import '@/pages/styles/Snippet.css';
import toast, { Toaster } from 'react-hot-toast';

export default function Snippet(props) {
  const { snip } = useParams();
  const { data, loading, error } = useQuery(GET_SPECIFIC_DATA, {
    variables: {
      id: snip,
    },
  });
  const [isCopied, setCopied] = useClipboard(data?.katalia_snippet[0].snippet);
  const snippetRef = useRef();

  useEffect(() => {
    console.group('Snippet Pages');
    console.log(history);
    console.groupEnd();
  }, [data]);
  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      {data?.katalia_snippet ? (
        <section className='content  p-12 space-y-6 flex flex-col items-center'>
          <p className='font-bold text-2xl capitalize'>
            {data?.katalia_snippet[0].title}
          </p>
          <div className='btn-group flex flex-row space-x-4 items-end'>
            <button
              className='px-4 text-sm py-2 font-bold text-white capitalize bg-green-600'
              onClick={() => {
                setCopied();
                toast.success('Code copied.');
              }}
            >
              Copy
            </button>
            <button
              className='px-4 text-sm py-2 font-bold text-white capitalize bg-green-600 w-'
              onClick={() => exportComponentAsJPEG(snippetRef)}
            >
              Export as Image
            </button>
          </div>
          <section
            className='font-semibold flex items-center p-6 justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 md:w-2/4 shadow-xl'
            ref={snippetRef}
          >
            <div className='snipp text-sm'>
              <SyntaxHighlighter
                language='javascript'
                style={materialDark}
                wrapLines
                wrapLongLines
              >
                {data?.katalia_snippet[0].snippet}
              </SyntaxHighlighter>
            </div>
          </section>{' '}
          <div className='flex flex-row text-left  text-white space-x-3 items-center justify-center'>
            <p className='font-bold text-lg rounded-lg px-3 py-2 bg-dark'>
              {data?.katalia_snippet[0].username}
            </p>
            <button
              className='px-4 text-sm py-2 font-bold text-white capitalize bg-green-600'
              onClick={() => exportComponentAsJPEG(snippetRef)}
            >
              Up
            </button>
            <p className='text-dark font-bold'> 15</p>
            <button
              className='px-4 text-sm py-2 font-bold text-white capitalize bg-red-600'
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
