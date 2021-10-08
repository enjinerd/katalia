import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_DATA, DATA_LENGTH } from '@/graphql/gql';
import Header from '@/components/Header';
import { useLocation, useHistory } from 'react-router-dom';
import '@/pages/styles/Home.css';
import { AnimatedInput } from '@/components/AnimatedInput';
import Fuse from 'fuse.js';
import ListData from '@/components/ListData';
import Paginator from 'react-hooks-paginator';

export default function Home() {
  // SECTION hooks

  // ANCHOR gql
  const [getData, { data }] = useLazyQuery(GET_ALL_DATA);
  const [getLength, { data: length }] = useLazyQuery(DATA_LENGTH);

  // ANCHOR Paginator
  // NOTE: Paginator offset and current page
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // ANCHOR Fuzzy search
  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['title', 'username'],
  };
  const [fuzzyData, setFuzzy] = useState('');
  const [isFuzzy, setIsFuzzy] = useState(false);
  const fuse = new Fuse(data?.katalia_snippet, options);

  // ANCHOR router
  const location = useLocation();
  const history = useHistory();

  // !SECTION Hooks

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
    getData();
    getLength();
    if (location.hash.split('&').includes('type=recovery')) {
      history.push('/forget-password' + location.hash.split('&')[0]);
    }
  }, []);

  useEffect(() => {
    getData({ variables: { offset } });
  }, [offset]);

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
            <Paginator
              totalRecords={length?.katalia_snippet_aggregate.aggregate.count}
              pageLimit={8}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageContainerClass='md:text-lg font-dm react-hooks-paginator'
            />
          </section>
        </div>
      </main>
    </>
  );
}
