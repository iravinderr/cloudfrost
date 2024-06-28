import React from 'react'

function RedButton({onClick, children}) {
  return (
    <button
    type="button"
    className={`w-auto p-3 flex justify-center items-center border-[1px] border-black rounded-md cursor-pointer bg-CustomRed text-white hover:bg-red-600 `}
    onClick={onClick}
    >
      {children}
    </button>
  )
}

export default RedButton