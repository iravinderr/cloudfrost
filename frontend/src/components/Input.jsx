import React from 'react'

function Input({ type, placeholder, value, setValue, ...props }) {
  const handleChange = (e) => {
    if (type === "file") {
      setValue(e.target.files[0]);
    } else {
      setValue(e.target.value);
    }
  }

  return (
    <input
        className={`w-full p-3 border-[1px] border-black rounded-md`}
        type={type}
        placeholder={placeholder}
        value={type === "file" ? undefined : value}
        onChange={handleChange}
        {...props}
    >
    </input>
  )
}

export default Input