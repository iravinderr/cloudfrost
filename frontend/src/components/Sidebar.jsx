import React from "react";
import FolderList from "./FolderList";

function Sidebar({ folders, setParentFolderId }) {
  return (
    <div className="sidebar">
      <FolderList folders={folders} setParentFolderId={setParentFolderId} />
    </div>
  );
}

export default Sidebar;
