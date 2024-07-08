import React from 'react';
import { Loader } from '../components';
import useAuthNavigation from '../hooks/AuthNavigation';

function Home() {
  const { loading } = useAuthNavigation();

  if (loading) {
    return <Loader />
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='flex'>
        <h1 className='text-9xl font-Crusader text-CustomRed'>Wal</h1>
        <h1 className='text-9xl font-Crusader text-CustomBlue'>Cloud</h1>
      </div>
        <p className='text-3xl text-red-900'>This is a prototype cloud storage web application</p>
    </div>
  )
}

export default Home
