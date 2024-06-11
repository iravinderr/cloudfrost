import React, { useState } from 'react';
import { NavBar } from './components/components.js';
import Login from './pages/Login.jsx';

function App() {
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <NavBar loginClick={() => setLoginVisible(true)} />
      {loginVisible && <Login />}
    </div>
  );
}

export default App;
