import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <section className='layout md:w-2/4 p-16 space-y-6 flex flex-col items-center justify-center'>
        <img src='/404.jpeg' />
      </section>
    </main>
  );
}
