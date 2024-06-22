import React, { useState } from "react";
import axios from "axios";
import { uploadFileAPI } from "../services/apis";
import toast from 'react-hot-toast';

function FileUpload({ parentFolderId, refreshItems }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentFolderId", parentFolderId);

    try {
      const response = await axios.post(uploadFileAPI, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      if (response.data.success) {
        toast.success("File uploaded successfully!");
        setFile(null); // Clear file input
        refreshItems();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="file-upload">
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
