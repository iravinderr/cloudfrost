import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';

function Home() {
  const navigate = useNavigate();
  const { authenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      if (authenticated) {
        navigate("/dashboard");
      }
    }
  }, [loading, authenticated, navigate]);

  if (isLoading) {
    return <LineWave />
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center text-9xl'>
        MyCloud
    </div>
  )
}

export default Home