import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Loader, FolderCreation, FileUpload, BlueButton, Folder, File } from "../components";
import toast from "react-hot-toast";
import { getFoldersAPI, getFilesAPI } from "../services/apis";
import { getRequestAxios } from "../services/requests";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [newCreation, setNewCreation] = useState(null);
  const [showFile, setShowFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const { parentFolderId } = useParams();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const folderRes = await getRequestAxios(getFoldersAPI, {parentFolderId});

      const fileRes = await getRequestAxios(getFilesAPI, {parentFolderId});

      if (folderRes.data.success && fileRes.data.success) {
        const combinedItems = [
          ...folderRes.data.data.map((folder) => ({
            ...folder,
            type: "folder",
          })),
          ...fileRes.data.data.map((file) => ({ ...file, type: "file" })),
        ];

        setItems(combinedItems);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, [parentFolderId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-screen h-screen p-8 flex flex-col gap-8">
      <div className="flex flex-wrap gap-4">
        {items.map((item) => 
          item.type === "folder" ? <Folder folder={item} /> : <File file={item} setShowFile={setShowFile} />
        )}
      </div>

      <div className="sticky top-3/4 flex justify-center items-center">
        <BlueButton onClick={() => setNewCreation({ type: "folder" })}>Create Folder</BlueButton>
        <BlueButton onClick={() => setNewCreation({ type: "file" })}>Upload File</BlueButton>
      </div>

      { newCreation && newCreation.type === "folder" && <FolderCreation parentFolderId={parentFolderId} refreshItems={fetchItems} setNewCreation={setNewCreation} /> }

      { newCreation && newCreation.type === "file" && <FileUpload parentFolderId={parentFolderId} refreshItems={fetchItems} setNewCreation={setNewCreation} /> }

      { showFile && <Modal file={showFile} setShowFile={setShowFile} /> }
    </div>
  );
}

export default Dashboard;
