import React from 'react';
import FolderList from './FolderList';

function Sidebar({ folders, setParentFolderId }) {
  return (
    <div className="sidebar">
      <h3>Folders</h3>
      <FolderList folders={folders} setParentFolderId={setParentFolderId} />
    </div>
  );
}

export default Sidebar;
