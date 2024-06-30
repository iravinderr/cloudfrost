import React, { useState } from 'react'
import RedButton from '../Buttons/RedButton'
import { deleteFileAPI, deleteFolderAPI } from '../../services/apis';
import { deleteRequestAxios } from '../../services/requests';
import toast from 'react-hot-toast';
import Loader from '../Loader';

function Delete({item, setItem, setShowDelete, fetchItems}) {

    const [loading, setLoading] = useState(null);

    const onClickHandler = () => {
        setItem(null);
        setShowDelete(false);
    }

    const handleItemDeletion = async () => {
        setLoading(true);
        try {
            const url = item.type === "file" ? deleteFileAPI : deleteFolderAPI;
            const response = await deleteRequestAxios(url, {
                fileId: item._id,
                folderId: item._id
            });
            
            if (response.data.success) {
                setLoading(false);
                toast.success(response.data.message);
                setShowDelete(false);
                setItem(null);
                fetchItems();
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    if (loading) {
        return <Loader />
    }

  return (
    <div
      className="flex justify-center items-center w-full h-full z-50 fixed left-0 top-0 overflow-auto bg-ModalBG"
      onClick={onClickHandler}
    >
      <div
        className="p-4 relative bg-white rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <RedButton onClick={handleItemDeletion}>Confirm Deletion</RedButton>
      </div>
    </div>
  )
}

export default Delete