import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import FolderCreation from '../components/FolderCreation';
import { getFoldersAPI, getFilesAPI } from '../services/apis';
import FolderList from '../components/FolderList';

function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [parentFolderId, setParentFolderId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const folderRes = await axios.get(getFoldersAPI, {
          withCredentials: true,
          params: { parentFolderId }
        });
        // const fileRes = await axios.get(getFilesAPI, { params: { parentFolderId } });
        setFolders(folderRes.data.data);
        // setFiles(fileRes.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    })();
  }, [parentFolderId]);

  return (
    <div className="dashboard">
      <div>
        <h3>Folders</h3>
        <FolderList folders={folders} setParentFolderId={setParentFolderId} />
      </div>
      <div className="main-content bg-slate-500">
        <FolderCreation parentFolderId={parentFolderId} />
        <FileList files={files} />
        <FileUpload parentFolderId={parentFolderId} />
      </div>
    </div>
  );
}

export default Dashboard;
