import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/Auth';
import { useDispatch } from 'react-redux';
import { setUsername } from '@/store/globalSlice';
import ConfirmDialog from './ConfirmDialog';

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, signOut } = useAuth();
  async function handleSignOut() {
    dispatch(setUsername(''));
    await signOut();
  }

  return (
    <nav className='flex items-center justify-between flex-wrap bg-white border-b border-gray-200 py-2  px-3 w-full font-dm'>
      <Link to='/'>
        <img src='/logo.png' />
      </Link>
      {user ? (
        <div className='space-x-4 font-secondary flex flex-row items-center justify-center '>
          <Link to='/dashboard'>
            <button className='px-3 py-1 text-sm md:text-xl md:px-6 md:py-2 font-bold text-white capitalize bg-gradient-to-r from-indigo-300 to-purple-600 transition duration-500 transform hover:-translate-y-1 hover:scale-100'>
              Dashboard
            </button>
          </Link>
          <ConfirmDialog
            isOpen={isOpen}
            setOpen={setOpen}
            handleConfirm={handleSignOut}
            title='Log Out?'
            message='Are you sure you want to log out?'
            titleAction='Log Out'
            className='px-2 py-1 text-sm md:text-xl  md:px-6 md:py-2 font-bold text-white bg-gradient-to-r from-red-400 via-red-500 to-yellow-600 transition duration-500 transform hover:-translate-y-1  hover:bg-yellow-400'
          />
        </div>
      ) : (
        <Link to='/login'>
          <button className='px-6 py-2 font-bold text-white capitalize bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 transition duration-500 transform hover:-translate-y-1 hover:scale-100 md:text-xl md:mr-5'>
            Login
          </button>
        </Link>
      )}
    </nav>
  );
}
