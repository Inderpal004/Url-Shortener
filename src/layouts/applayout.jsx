import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div>
      <main className='min-h-screen container m-auto'>
        <Header/>
        <Outlet/>
        {/* Body */}
      </main>

      <div className='p-6 text-center font-semibold bg-gray-800 mt-10'>
        Made with 💖 by Inderpal
      </div>
    </div>
  )
}
