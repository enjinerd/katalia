import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DATA } from '@/graphql/gql';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import '@/pages/styles/Home.css';

export default function Home() {
  const { data } = useQuery(GET_ALL_DATA);
  return (
    <>
      <main>
        <div className='flex flex-col min-h-screen card'>
          <Header />
          <section className='content  p-6 space-y-8 mt-8'>
            <div className='flex flex-row space-x-4 items-center justify-center'>
              <input
                className=' border-gray-200 font-secondary text-lg md:text-xl'
                type='text'
                placeholder='Search snippet...'
              />
              <button className='px-6 py-2 font-bold text-white uppercase bg-green-500 font-dm text-lg'>
                Cari
              </button>
            </div>
            {data?.katalia_snippet ? (
              <div className='grid grid-cols-2 md:grid-cols-4'>
                {data?.katalia_snippet?.map((data) => (
                  <div className='snippet_card shadow-xl rounded-md flex flex-col m-3 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 h-28 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:text-white'>
                    <p className='font-bold px-6 text-sm md:text-base py-4 h-full font-primary  '>
                      <Link to={`/snippet/${data.id}`}>{data.title}</Link>
                    </p>
                    <div className='bg-gradient-to-l from-gray-700 via-gray-900 to-black '>
                      <p className='text-sm md:text-base font-bold text-white p-2 font-dm'>
                        {data.username}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=' flex justify-center items-center p-12'>
                <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900'></div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
