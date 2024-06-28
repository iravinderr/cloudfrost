import React from "react";

function Modal({ file, setSelectedFile }) {
  return (
    <div
      className="modal flex justify-center items-center w-full h-full z-50 fixed left-0 top-0 overflow-auto bg-ModalBG "
      onClick={() => setSelectedFile(null)}
    >
      <div 
        className="modal-content p-4 relative m-auto bg-white w-4/5 max-w-3xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <img src={file.url} alt={file.name} style={{ width: "100%" }} />
      </div>
    </div>
  );
}

export default Modal;
