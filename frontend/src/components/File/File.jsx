import React from 'react'

function File({item, setShowFile }) {
  return (
    <div
        key={item._id}
        className={`p-4 w-[150px] h-[150px] flex flex-col justify-center items-center cursor-pointer bg-white border-2 border-[#eaeaea] hover:bg-[#eaeaea]`}
        onClick={() => setShowFile(item)}
    >
        <img src={item.url} alt={item.name} style={{ width: "120px", height: "120px", objectFit: "cover" }} />
        <div>{item.name}</div>
    </div>
  )
}

export default File