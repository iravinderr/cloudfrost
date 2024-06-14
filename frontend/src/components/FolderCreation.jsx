import React, { useState } from 'react';
import axios from 'axios';
import { createFolderAPI } from '../services/apis';

function FolderCreation({ parentFolderId }) {
  const [folderName, setFolderName] = useState('');

  const handleFolderCreation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(createFolderAPI, { name: folderName, parentFolderId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="folder-creation">
      <form onSubmit={handleFolderCreation}>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          required
        />
        <button type="submit">Create Folder</button>
      </form>
    </div>
  );
}

export default FolderCreation;
