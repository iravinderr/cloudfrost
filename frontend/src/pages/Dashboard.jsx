import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import FolderCreation from '../components/FolderCreation';
import Sidebar from '../components/Sidebar';
import { getFoldersAPI, getFilesAPI } from '../services/apis';

function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [parentFolderId, setParentFolderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const folderRes = await axios.get(getFoldersAPI, { params: { parentFolderId } });
      const fileRes = await axios.get(getFilesAPI, { params: { parentFolderId } });
      setFolders(folderRes.data.data);
      setFiles(fileRes.data.data);
    };
    fetchData();
  }, [parentFolderId]);

  return (
    <div className="dashboard">
      <Sidebar folders={folders} setParentFolderId={setParentFolderId} />
      <div className="main-content">
        <FolderCreation parentFolderId={parentFolderId} />
        <FileList files={files} />
        <FileUpload parentFolderId={parentFolderId} />
      </div>
    </div>
  );
}

export default Dashboard;
