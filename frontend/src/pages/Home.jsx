import React from 'react';
import { Loader } from '../components';
import useAuthNavigation from '../hooks/AuthNavigation';
import { APP_NAME } from '../constants';

function Home() {
  const { loading } = useAuthNavigation();

  if (loading) {
    return <Loader />
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='flex'>
        <h1 className='text-9xl font-TitanOne text-CustomBlue'>{APP_NAME}</h1>
      </div>
      <p className='text-3xl text-red-900'>This is a prototype cloud storage web application</p>
    </div>
  )
}

export default Home;
