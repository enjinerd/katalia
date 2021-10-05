import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DATA } from '@/graphql/gql';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import '@/pages/styles/Home.css';
import { AnimatedInput } from '@/components/AnimatedInput';
import Fuse from 'fuse.js';
import ListData from '@/components/ListData';

export default function Home() {
  const { data } = useQuery(GET_ALL_DATA);
  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['title'],
  };
  const [fuzzyData, setFuzzy] = useState('');
  const [isFuzzy, setIsFuzzy] = useState(false);

  const fuse = new Fuse(data?.katalia_snippet, options);

  const handleSearch = (e) => {
    if (e.target.value !== '') {
      setIsFuzzy(true);
    } else {
      setIsFuzzy(false);
    }
    const { value } = e.target;
    const result = fuse.search(value);
    setFuzzy(result);
    console.log(fuzzyData[0].item.title);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <main>
        <div className='flex flex-col min-h-screen card'>
          <Header />
          <section className='content  p-6 space-y-8 mt-8'>
            <div className='flex flex-row space-x-4 items-center justify-center'>
              <AnimatedInput
                placeholder='Search snippet...'
                onChange={handleSearch}
              />
            </div>
            {data?.katalia_snippet ? (
              <ListData
                data={isFuzzy ? fuzzyData : data?.katalia_snippet}
                isFuzzy={isFuzzy}
              />
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
