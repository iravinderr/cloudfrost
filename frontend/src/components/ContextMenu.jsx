import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FolderCreation from './FolderCreation';

function ContextMenu({ mouseX, mouseY, handleClose, parentFolderId }) {
  const [showUpload, setShowUpload] = useState(false);
  const [showFolderCreation, setShowFolderCreation] = useState(false);

  const handleOptionClick = (option) => {
    if (option === 'uploadFile') {
      setShowUpload(true);
    } else if (option === 'createFolder') {
      setShowFolderCreation(true);
    }
    handleClose();
  };

  return (
    <div
      className="context-menu"
      style={{
        top: mouseY,
        left: mouseX,
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        zIndex: 1000
      }}
      onMouseLeave={handleClose}
    >
      <div onClick={() => handleOptionClick('uploadFile')}>Upload File</div>
      <div onClick={() => handleOptionClick('createFolder')}>Create Folder</div>

      {showUpload && (
        <div className="context-menu-upload">
          <FileUpload parentFolderId={parentFolderId} />
        </div>
      )}
      {showFolderCreation && (
        <div className="bg-black context-menu-create-folder">
          <FolderCreation parentFolderId={parentFolderId} />
        </div>
      )}
    </div>
  );
}

export default ContextMenu;
