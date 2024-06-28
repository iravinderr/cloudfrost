import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Loader, FolderCreation, FileUpload, BlueButton } from "../components";
import toast from "react-hot-toast";
import { getFoldersAPI, getFilesAPI } from "../services/apis";
import { getRequestAxios } from "../services/requests";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [newCreation, setNewCreation] = useState(null);
  const [showFile, setShowFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { parentFolderId } = useParams();
  const navigate = useNavigate();

  const fetchItems = async () => {
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

        setLoading(false);
        setItems(combinedItems);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
          item.type === "folder" ? (
            <div
              key={item._id}
              className="p-4 w-[150px] h-[150px] flex justify-center items-center cursor-pointer bg-white border-2 border-[#eaeaea] hover:bg-[#eaeaea]"
              onClick={() => navigate(`/dashboard/${item._id}`)}
            >
              {item.name}
            </div>
          ) : (
            <div
              key={item._id}
              className="p-4 w-[150px] h-[150px] flex flex-col justify-center items-center cursor-pointer bg-white border-2 border-[#eaeaea] hover:bg-[#eaeaea]"
              onClick={() => setShowFile(item)}
            >
              <img
                src={item.url}
                alt={item.name}
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <div>{item.name}</div>
            </div>
          )
        )}
      </div>

      <div className="sticky top-3/4 flex justify-center items-center">
        <BlueButton onClick={() => setNewCreation({ type: "folder" })}>Create Folder</BlueButton>
        <BlueButton onClick={() => setNewCreation({ type: "file" })}>Upload File</BlueButton>
      </div>

      {newCreation && newCreation.type === "folder" && (
        <FolderCreation
          parentFolderId={parentFolderId}
          refreshItems={fetchItems}
          setNewCreation={setNewCreation}
        />
      )}

      {newCreation && newCreation.type === "file" && (
        <FileUpload
          parentFolderId={parentFolderId}
          refreshItems={fetchItems}
          setNewCreation={setNewCreation}
        />
      )}

      {showFile && (
        <Modal file={showFile} setShowFile={setShowFile} />
      )}
    </div>
  );
}

export default Dashboard;
