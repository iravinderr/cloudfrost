import React from 'react'

function Button({borderColor, bgColor, text, textColor, onClick}) {
  return (
    <button
    onClick={onClick}
    className='h-10 w-24 flex justify-center items-center text-base cursor-pointer border-2 rounded-md' 
    style={{
        borderColor: borderColor,
        backgroundColor: bgColor,
        color: textColor
    }}
    >
        {text}
    </button>
  )
}

export default Button