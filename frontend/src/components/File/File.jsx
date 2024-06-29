import React from "react";

function File({ file, setShowFile }) {
  return (
    <div
      key={file._id}
      className={`p-4 w-[150px] h-[150px] flex flex-col justify-center items-center cursor-pointer bg-white border-2 border-[#eaeaea] hover:bg-[#eaeaea]`}
      onClick={() => setShowFile(file)}
    >
      {file.fileType === "image" ? (
        <img
          src={file.url}
          alt={file.name}
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
      ) : (
        <video
          src={file.url}
          alt={file.name}
          controls
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
      )}
      <div>{file.name}</div>
    </div>
  );
}

export default File;
