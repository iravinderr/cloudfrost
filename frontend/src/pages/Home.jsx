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
    <div className='h-screen w-screen flex justify-center items-center text-9xl'>
        Cloudfrost
    </div>
  )
}

export default Home
