import React, { useState } from 'react';
import axios from 'axios';
import { createFolderAPI } from '../services/apis';
import toast from 'react-hot-toast';

function FolderCreation({ parentFolderId, refreshItems }) {
  const [folderName, setFolderName] = useState('');

  const handleFolderCreation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(createFolderAPI, { name: folderName, parentFolderId }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      if (response.data.success) {
        toast.success("Folder created successfully!");
        setFolderName(''); // Clear input field
        refreshItems(); // Refresh items after creation
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
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
