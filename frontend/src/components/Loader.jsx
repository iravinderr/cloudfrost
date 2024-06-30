import React from 'react'
import { LineWave } from "react-loader-spinner";


function Loader() {
  return (
    <div className='fixed h-full w-full flex justify-center items-center z-50 bg-ModalBG'>
      <LineWave color='black' />
    </div>
  )
}

export default Loader