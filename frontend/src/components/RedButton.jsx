import React from 'react'

function RedButton({text, onClick}) {
  return (
    <button
    className='bg-red-500 text-white w-auto'
    onClick={onClick}
    >
      {text}
    </button>
  )
}

export default RedButton