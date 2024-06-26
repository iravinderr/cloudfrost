import React, { useState } from "react";
import { uploadFileAPI } from "../../services/apis";
import { postRequestAxios } from "../../services/requests";
import BlueButton from "../Buttons/BlueButton";
import toast from "react-hot-toast";
import Loader from "../Loader";
import Input from "../Input";

function FileUpload({ parentFolderId, fetchItems, setNewCreation }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentFolderId", parentFolderId);
    const contentType = "multipart/form-data";
    try {
      const response = await postRequestAxios(
        uploadFileAPI,
        formData,
        null,
        undefined,
        contentType
      );

      if (response.data.success) {
        setLoading(false);
        setNewCreation(null);
        toast.success(response.data.message);
        fetchItems();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div
      className="flex justify-center items-center w-full h-full z-50 fixed left-0 top-0 overflow-auto bg-ModalBG"
      onClick={() => setNewCreation(null)}
    >
      <form className="z-50 bg-white" onClick={(e) => e.stopPropagation()}>
        <Input type={"file"} setValue={setFile} />

        <BlueButton onClick={handleFileUpload}>Upload File</BlueButton>
      </form>
    </div>
  );
}

export default FileUpload;
