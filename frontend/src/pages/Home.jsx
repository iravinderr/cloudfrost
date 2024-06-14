import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { verifyToken } from '../utils/verifyToken';

function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const verifiedToken = await verifyToken();
      setAuthenticated(verifiedToken);
    })();
  }, []);

  if (authenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center text-9xl'>
        MyCloud
    </div>
  )
}

export default Home