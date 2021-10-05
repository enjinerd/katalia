import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/Auth';
import { GET_SPESIFIC_USER, REGISTER_USER } from '@/graphql/gql';
import * as unsullied from 'unsullied';
import { customAlphabet } from 'nanoid';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from '@/store/globalSlice';

export default function Welcome() {
  const globalState = useSelector((state) => state);

  const dispatch = useDispatch();

  const [addUsername] = useMutation(REGISTER_USER);
  const [getSpecificUser, { data: dataUser, error }] =
    useLazyQuery(GET_SPESIFIC_USER);
  const { user } = useAuth();
  const nanoid = customAlphabet('1234567890abcdef', 4);
  const name = unsullied();

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
    }

    if (!dataUser?.katalia_user.username) {
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
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        <p className='text-2xl font-medium font-secondary'>
          Your email has been verified, now you can explore our features on :{' '}
          <Link to='/Dashboard'>
            {' '}
            <span className='font-bold font-dm'>Dashboard</span>
          </Link>{' '}
        </p>
      </section>
    </main>
  );
}
