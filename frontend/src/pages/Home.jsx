import React, { useEffect, useState } from 'react'
import { Loader } from '../components';
import useAuthNavigation from '../hooks/AuthNavigation';

function Home() {
  const { loading } = useAuthNavigation();

  if (loading) {
    return <Loader />
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <h1 className='text-9xl'>Cloudfrost</h1>
        <p className='text-3xl text-red-900'>This is a prototype cloud storage web application</p>
    </div>
  )
}

export default Home
