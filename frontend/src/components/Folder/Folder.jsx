import React from 'react'
import { useNavigate } from 'react-router-dom'

function Folder({folder}) {
    const navigate = useNavigate();
  return (
    <div
        key={folder._id}
        className={`p-4 w-[150px] h-[150px] flex justify-center items-center cursor-pointer bg-white border-2 border-[#eaeaea] hover:bg-[#eaeaea]`}
        onClick={() => navigate(`/dashboard/${folder._id}`)}
    >
        {folder.name}
    </div>
  )
}

export default Folder