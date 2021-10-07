import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useAuth } from '@/contexts/Auth';
import {
  GET_SPESIFIC_USER,
  REGISTER_USER,
  GET_USER_SNIPPET_DATA,
} from '@/graphql/gql';
import { customAlphabet } from 'nanoid';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from '@/store/globalSlice';

import Header from '@/components/Header';

function Dashboard() {
  const globalState = useSelector((state) => state);

  const dispatch = useDispatch();

  const [addUsername] = useMutation(REGISTER_USER);
  const [getSpecificUser, { data: dataUser, error }] =
    useLazyQuery(GET_SPESIFIC_USER);

  const [getSpecificData, { data: dataSnippet }] = useLazyQuery(
    GET_USER_SNIPPET_DATA
  );

  const nanoid = customAlphabet('1234567890abcdef', 6);

  // Get current user and signOut function from context
  const { user } = useAuth();

  useEffect(() => {
    getSpecificUser({
      variables: {
        where: {
          email: {
            _eq: user.email,
          },
        },
      },
    });

    if (dataUser?.katalia_user[0].username) {
      if (globalState.data.username === '') {
        dispatch(setUsername(dataUser?.katalia_user[0].username));
      }
      getSpecificData({
        variables: {
          where: {
            username: {
              _eq: dataUser?.katalia_user[0].username,
            },
          },
        },
      });
    }

    if (!dataUser?.katalia_user.username) {
      addUsername({
        variables: {
          username: nanoid(),
          email: user.email,
        },
      });
    }
  }, [dataUser]);

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <section className='content  p-6 space-y-8 mt-3 flex flex-col items-center justify-center'>
        <p className='text-2xl font-secondary'>
          Hello,{' '}
          <span className='font-bold'>
            {dataUser?.katalia_user[0]?.username}
          </span>
        </p>
        <div className='flex flex-row space-x-3 font-dm'>
          <Link to='/dashboard/add'>
            <button className='px-4 py-2 font-bold text-white bg-blue-500 transition duration-500 transform hover:-translate-y-1  hover:bg-blue-400'>
              Add Snippet
            </button>
          </Link>
          <Link to='/dashboard/settings'>
            <button className='px-4 py-2 font-bold text-white bg-blue-500 transition duration-500 transform hover:-translate-y-1  hover:bg-blue-400'>
              User Settings
            </button>
          </Link>
        </div>

        {dataSnippet?.katalia_snippet ? (
          <div className='grid grid-cols-2 md:grid-cols-4 '>
            {dataSnippet?.katalia_snippet?.map((data) => (
              <div className='snippet_card shadow-xl rounded-md flex flex-col m-3 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 h-28 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:text-white'>
                <p className='font-bold px-6 text-sm md:text-base py-4 h-full font-primary '>
                  <Link to={`/snippet/${data.id}`}>{data.title}</Link>
                </p>
                <div className='bg-gradient-to-l from-gray-700 via-gray-900 to-black'>
                  <p className='text-sm md:text-base text-white p-2 font-dm'>
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
    </main>
  );
}

export default withRouter(Dashboard);
