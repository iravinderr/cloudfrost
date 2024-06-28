import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Loader, FolderCreation, FileUpload } from "../components";
import toast from "react-hot-toast";
import { getFoldersAPI, getFilesAPI } from "../services/apis";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { parentFolderId } = useParams();
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const folderRes = await axios.get(getFoldersAPI, {
        withCredentials: true,
        params: { parentFolderId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const fileRes = await axios.get(getFilesAPI, {
        withCredentials: true,
        params: { parentFolderId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

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
      toast.error(error.response?.data?.message || "An error occurred.");
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
              onClick={() => setSelectedFile(item)}
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

      <div className="footer-buttons">
        <button onClick={() => setSelectedFile({ type: "folder" })}>Create Folder</button>
        <button onClick={() => setSelectedFile({ type: "file" })}>Upload File</button>
      </div>

      {selectedFile && selectedFile.type === "folder" && (
        <FolderCreation
          parentFolderId={parentFolderId}
          refreshItems={fetchItems}
        />
      )}

      {selectedFile && selectedFile.type === "file" && (
        <FileUpload
          parentFolderId={parentFolderId}
          refreshItems={fetchItems}
        />
      )}

      {selectedFile && (
        <Modal file={selectedFile} setSelectedFile={setSelectedFile} />
      )}
    </div>
  );
}

export default Dashboard;
