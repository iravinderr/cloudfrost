import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";

function Item({ item, setShowFile, setShowOptions, setItemForOptions }) {
  const navigate = useNavigate();
  const handleOptionsClick = (e) => {
    e.stopPropagation();
    setShowOptions(true);
    setItemForOptions(item);
  };

  return (
    <div
      key={item._id}
      className={`relative p-4 w-[150px] h-[150px] flex flex-col justify-center items-center cursor-pointer bg-white border-2 border-[#eaeaea] hover:bg-[#eaeaea]`}
      onClick={() => {
        item.type === "file"
          ? setShowFile(item)
          : navigate(`/dashboard/folder/${item._id}`);
      }}
    >
      <div
        className="absolute top-2 right-0 w-6 h-6 flex justify-center items-center rounded-full hover:bg-slate-100"
        onClick={handleOptionsClick}
      >
        <FaEllipsisVertical />
      </div>

      {item.type === "folder" ? (
        <div>{item.name}</div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {item.fileType === "image" ? (
            <img
              src={item.url}
              alt={item.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <video
              src={item.url}
              alt={item.name}
              controls
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          )}
          <p className="text-sm" >{item.name}</p>
        </div>
      )}
    </div>
  );
}

export default Item;
