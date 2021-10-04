import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Verified() {
  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        <p className='text-2xl font-medium font-secondary'>
          Your email has been verified, now you can{' '}
          <Link to='/login'>
            {' '}
            <span className='font-bold font-dm'>Login</span>
          </Link>{' '}
        </p>
      </section>
    </main>
  );
}
