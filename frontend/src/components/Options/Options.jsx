import React from "react";

function Options({ setShowOptions }) {

    const renameHandler = async () => {
        try {
            setShowOptions(false);
        } catch (error) {
            
        }
    }
    
    const deleteHandler = async () => {
        try {
            setShowOptions(false);
        } catch (error) {
            
        }
    }

  const options = [
    {
      name: "Rename",
      handler: renameHandler
    },
    {
      name: "Delete",
      handler: deleteHandler
    },
  ];

  return (
    <div
      className="flex justify-center items-center w-full h-full z-50 fixed left-0 top-0 overflow-auto bg-ModalBG"
      onClick={() => setShowOptions(false)}
    >
      <ul
        className="p-3 relative w-48 flex flex-col justify-center items-center gap-1 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {options.map((option) => <li className="w-full h-8 p-1 flex items-center cursor-pointer hover:bg-slate-100" onClick={option.handler}>{option.name}</li>)}
      </ul>
    </div>
  );
}

export default Options;
