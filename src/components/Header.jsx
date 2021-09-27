import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className='flex items-center justify-between flex-wrap bg-white border-b border-gray-200 py-2 px-16 w-full'>
      <Link to='/'>
        <img src='/logo.png' />
      </Link>
      <Link to='/login'>
        <button className='px-6 py-2 font-bold text-white capitalize bg-dark'>
          Login
        </button>
      </Link>
    </nav>
  );
}
