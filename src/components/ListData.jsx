import React from 'react';
import { Link } from 'react-router-dom';

export default function ListData({ data, isFuzzy }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4'>
      {data?.map((data) => (
        <div className='snippet_card shadow-xl rounded-md flex flex-col m-3 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 h-28 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:text-white'>
          {isFuzzy ? (
            <div className='flex flex-col'>
              <p className='font-bold px-6 text-sm md:text-base py-4 h-full font-primary  '>
                <Link to={`/snippet/${data.item.id}`}>{data.item.title}</Link>
              </p>
              <div className='bg-gradient-to-l from-gray-700 via-gray-900 to-black '>
                <p className='text-sm md:text-base font-bold text-white p-2 font-dm'>
                  {data.item.username}
                </p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col'>
              <p className='font-bold px-6 text-sm md:text-base py-4 h-full font-primary  '>
                <Link to={`/snippet/${data.id}`}>{data.title}</Link>
              </p>
              <div className='bg-gradient-to-l from-gray-700 via-gray-900 to-black '>
                <p className='text-sm md:text-base font-bold text-white p-2 font-dm'>
                  {data.username}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
