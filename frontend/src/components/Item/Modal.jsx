import React from "react";

function Modal({ file, setShowFile }) {
  return (
    <div
      className="flex justify-center items-center w-full h-full z-50 fixed left-0 top-0 overflow-auto bg-ModalBG "
      onClick={() => setShowFile(null)}
    >
      <div 
        className="p-2 relative m-auto bg-white w-4/5 max-w-3xl h-auto flex flex-col justify-center items-center gap-2" 
        onClick={(e) => e.stopPropagation()}
      >
        {file.fileType === "image" ? <img src={file.url} alt={file.name} style={{ width: "100%" }} /> : <video src={file.url} style={{ width: "100%", height: "100%" }} /> }
        {file.name}
      </div>
    </div>
  );
}

export default Modal;
