import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";

function Input({ type, placeholder, value, setValue, showPassword, setShowPassword, ...props }) {
  
  const handleChange = (e) => {
    if (type === "file") {
      setValue(e.target.files[0]);
    } else {
      setValue(e.target.value);
    }
  }

  return (
    <div className={`h-12 flex justify-center items-center border-[2px] border-black rounded-sm`}>
      <input
          className="h-full w-full p-3"
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={type === "file" ? undefined : value}
          onChange={handleChange}
          {...props}
      />

      {type === "password" ? <div className="h-full w-12 flex justify-center items-center bg-slate-100 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEyeOff /> : <FaRegEye /> }</div> : null }
    </div>
  )
}

export default Input