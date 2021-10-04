import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '@/contexts/Auth';
import { GET_SPESIFIC_USER, UPDATE_USERNAME } from '@/graphql/gql';
import * as unsullied from 'unsullied';
import { customAlphabet } from 'nanoid';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from '@/store/globalSlice';
import { useForm, useFormState } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';

export default function Dashboard() {
  const {
    register,
    getValues,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setFocus,
  } = useForm();
  const globalState = useSelector((state) => state);

  const dispatch = useDispatch();

  const [getSpecificUser, { data: dataUser, error }] =
    useLazyQuery(GET_SPESIFIC_USER);

  const [updateUsername] = useMutation(UPDATE_USERNAME);

  // Get current user and signOut function from context
  const { user, signOut } = useAuth();

  const history = useHistory();
  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = () => {
    const username = getValues('username');
    setDisabled(true);
    updateUsername({
      variables: {
        prevUsername: dataUser?.katalia_user[0].username,
        usernameUpdate: username,
      },
      refetchQueries: [getSpecificUser],
    }).then(() => {
      dispatch(setUsername(username));
      toast.success('Username updated successfully');
      setDisabled(false);
      window.location.reload();
    });
  };

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
  }, []);

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <section className='content  p-6 space-y-8 mt-3 flex flex-col items-center justify-center'>
        <section className='layout w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
          <form className='flex flex-col space-y-4 w-full'>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='username' className='font-bold text-dark'>
                Username
              </label>
              <input
                name='username'
                id='username'
                type='text'
                {...register('username', {
                  required: 'Required',
                  maxLength: {
                    value: 25,
                    message: '25 char max',
                  },
                  minLength: { value: 5, message: '9 char min' },
                })}
                className={
                  errors?.username && 'border border-red-500 bg-red-100'
                }
                defaultValue={dataUser?.katalia_user[0].username}
              />
              {errors?.username && errors?.username.type == 'required' ? (
                <p tw='text-red-500 text-sm'>🚨 Cant be empty!</p>
              ) : null}
              {errors?.username && errors?.username.type == 'minLength' ? (
                <p tw='text-red-500 text-sm'>🚨 {errors?.username.message}!</p>
              ) : null}
              <br />
              <button
                type='submit'
                className='disabled px-4 py-2 font-bold text-white bg-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed'
                disabled={isDisabled}
                onClick={handleSubmit(onSubmit)}
              >
                Update Data
              </button>
            </div>
          </form>
        </section>
      </section>
      <Toaster />
    </main>
  );
}
