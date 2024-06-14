import React from "react";

function FileList({ files }) {
  return (
    <div className="file-list">
      {files.map((file) => (
        <div key={file._id} className="file-item">
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            <img style={{height: "200px"}} src={file.url} alt="" />
            {file.name}
          </a>
        </div>
      ))}
    </div>
  );
}

export default FileList;
