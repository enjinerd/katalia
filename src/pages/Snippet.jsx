import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { useQuery } from '@apollo/client';
import { GET_SPECIFIC_DATA } from '@/graphql/gql';
import { useParams } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useClipboard from 'react-use-clipboard';

export default function Snippet(props) {
  const { data, loading, error } = useQuery(GET_SPECIFIC_DATA, {
    variables: {
      id: 'hxrnd',
    },
  });
  const [isCopied, setCopied] = useClipboard(data?.katalia_snippet[0].snippet);

  useEffect(() => {
    console.log(data?.katalia_snippet[0].title);
  }, [data]);

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      {data?.katalia_snippet ? (
        <section className='content  p-12 space-y-6 flex flex-col items-center justify-center'>
          <p className='font-bold text-2xl capitalize'>
            {data?.katalia_snippet[0].title}
          </p>
          <div className='btn-group flex flex-row space-x-4'>
            <button
              className='px-4 text-sm py-2 font-bold text-white capitalize bg-dark'
              onClick={setCopied}
            >
              Copy
            </button>
          </div>
          <section className='w-2/4 font-semibold flex items-center justify-center'>
            <SyntaxHighlighter language='javascript' style={materialDark}>
              {data?.katalia_snippet[0].snippet}
            </SyntaxHighlighter>
          </section>{' '}
        </section>
      ) : (
        <section className=' flex justify-center items-center p-12'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900'></div>
        </section>
      )}
    </main>
  );
}
