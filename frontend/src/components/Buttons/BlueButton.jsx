import React from "react";

function BlueButton({onClick, children, ...props}) {
  return (
    <button
    type="button"
    className={`w-full p-3 flex justify-center items-center border-[1px] border-black rounded-md cursor-pointer bg-CustomBlue text-white hover:bg-cyan-800`}
    onClick={onClick}
    {...props}
    >
      {children}
    </button>
  )
}

export default BlueButton