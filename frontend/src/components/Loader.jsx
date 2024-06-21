import React from 'react'
import { LineWave } from "react-loader-spinner";


function Loader() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <LineWave color='black' />
    </div>
  )
}

export default Loader