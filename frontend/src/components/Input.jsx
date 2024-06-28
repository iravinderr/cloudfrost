import React from 'react'

function Input({ type, placeholder, value, onChangeHandler }) {
  return (
    <input
        className={`w-full p-3 border-[1px] border-black rounded-md`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
    >
    </input>
  )
}

export default Input