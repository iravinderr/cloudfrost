import React from 'react'

function Input({ type, placeholder, value, setValue, ...props }) {
  return (
    <input
        className={`w-full p-3 border-[1px] border-black rounded-md`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
    >
    </input>
  )
}

export default Input