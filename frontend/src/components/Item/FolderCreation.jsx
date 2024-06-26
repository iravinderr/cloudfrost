import React, { useState } from "react";
import { createFolderAPI } from "../../services/apis";
import toast from "react-hot-toast";
import Input from "../Input";
import BlueButton from "../Buttons/BlueButton";
import { postRequestAxios } from "../../services/requests";

function FolderCreation({ parentFolderId, fetchItems, setNewCreation }) {
  const [folderName, setFolderName] = useState("");

  const handleFolderCreation = async (e) => {
    e.preventDefault();
    try {
      const reqBody = { name: folderName, parentFolderId };
      const response = await postRequestAxios(createFolderAPI, reqBody);
      if (response.data.success) {
        setNewCreation(null);
        toast.success(response.data.message);
        fetchItems();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center w-full h-full z-50 fixed left-0 top-0 overflow-auto bg-ModalBG"
      onClick={() => setNewCreation(null)}
    >
      <form
        className="p-4 relative bg-white rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Input
          type={"text"}
          placeholder={"Folder Name"}
          value={folderName}
          setValue={setFolderName}
        />

        <BlueButton onClick={handleFolderCreation}>Create Folder</BlueButton>
      </form>
    </div>
  );
}

export default FolderCreation;
