import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@/contexts/Auth';
import { GET_SPESIFIC_USER, REGISTER_USER } from '@/graphql/gql';
import * as unsullied from 'unsullied';
import { customAlphabet } from 'nanoid';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from '@/store/globalSlice';

import Header from '@/components/Header';

export default function Dashboard() {
  const globalState = useSelector((state) => state);

  const dispatch = useDispatch();

  const [addUsername] = useMutation(REGISTER_USER);
  const [getSpecificUser, { data: dataUser, error }] =
    useLazyQuery(GET_SPESIFIC_USER);

  const nanoid = customAlphabet('1234567890abcdef', 4);
  const name = unsullied();

  // Get current user and signOut function from context
  const { user, signOut } = useAuth();

  const history = useHistory();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

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
      dispatch(setUsername(dataUser?.katalia_user[0].username));
    }

    if (dataUser?.katalia_user.length === 0) {
      addUsername({
        variables: {
          username: name + nanoid(),
          email: user.email,
        },
      });
    }
  }, [dataUser]);

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <section className='content  p-6 space-y-8 mt-3 flex flex-col items-center justify-center'>
        <p className='text-lg'>
          Hello{' '}
          <span className='font-bold'>
            {dataUser?.katalia_user[0].username}
          </span>
        </p>
        <Link to='/add'>
          <button className='px-4 py-2 font-bold text-white bg-blue-500 transition duration-500 transform hover:-translate-y-1  hover:bg-blue-400'>
            Add Snippet
          </button>
        </Link>
      </section>
    </main>
  );
}
