import React from "react";

function Modal({ file, setShowFile }) {
  console.log("file -> ", file);
  return (
    <div
      className="flex justify-center items-center w-full h-full z-50 fixed left-0 top-0 overflow-auto bg-ModalBG "
      onClick={() => setShowFile(null)}
    >
      <div 
        className="p-4 relative m-auto bg-white w-4/5 max-w-3xl h-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        {file.fileType === "image" ? <img src={file.url} alt={file.name} style={{ width: "100%" }} /> : <video src={file.url} style={{ width: "100%", height: "100%" }} /> }
        
      </div>
    </div>
  );
}

export default Modal;