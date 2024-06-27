import React from "react";
import { deleteRequestAxios } from "../../services/requests";
import { deleteAccountAPI } from "../../services/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthNavigation from "../../hooks/AuthNavigation";

export default function ConfirmDeletion() {
  const { setAuthenticated } = useAuthNavigation();
  const navigate = useNavigate();
  const deleteAccount = async () => {
    try {
      const response = await deleteRequestAxios(deleteAccountAPI);
      if (response.data.success) {
        toast.success(response.data.message);
        setAuthenticated(false);
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <button className="bg-red-500 text-white" onClick={deleteAccount}>
      Confirm Deletion
    </button>
  );
}
