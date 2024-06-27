import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components';

function Home() {
  const navigate = useNavigate();
  const { authenticated, isLoading } = useAuth();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setLocalLoading(false);
      if (authenticated) {
        navigate("/dashboard");
      }
    }
  }, [isLoading, authenticated, navigate]);

  if (localLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <h1 className='text-9xl'>Cloudfrost</h1>
        <p className='text-3xl text-red-900'>This is a prototype cloud storage web application</p>
    </div>
  )
}

export default Home
