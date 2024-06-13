import React from "react";

function FolderList({ folders, setParentFolderId }) {
  return (
    <div className="folder-list">
      {folders.map((folder) => (
        <div
          key={folder._id}
          className="folder-item"
          onClick={() => setParentFolderId(folder._id)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
}

export default FolderList;
