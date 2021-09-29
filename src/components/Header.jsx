import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/Auth';

export default function Header() {
  const { user, signOut } = useAuth();
  async function handleSignOut() {
    await signOut();
  }

  return (
    <nav className='flex items-center justify-between flex-wrap bg-white border-b border-gray-200 py-2 px-16 w-full'>
      <Link to='/'>
        <img src='/logo.png' />
      </Link>
      {user ? (
        <div className='space-x-4'>
          <Link to='/dashboard'>
            <button className='px-6 py-2 font-bold text-white capitalize bg-gradient-to-r from-green-200 via-green-400 to-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100'>
              Dashboard
            </button>
          </Link>
          <button
            className='px-4 py-2 font-bold text-white bg-yellow-500 transition duration-500 transform hover:-translate-y-1  hover:bg-yellow-400'
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link to='/login'>
          <button className='px-6 py-2 font-bold text-white capitalize bg-gradient-to-r from-green-200 via-green-400 to-green-500 transition duration-500 transform hover:-translate-y-1 hover:scale-100'>
            Login
          </button>
        </Link>
      )}
    </nav>
  );
}
