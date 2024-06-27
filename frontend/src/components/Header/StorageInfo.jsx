import React, { useEffect, useState } from "react";
import { getRequestAxios } from "../../services/requests";
import { getStorageInfoAPI } from "../../services/apis";
import toast from "react-hot-toast";

export default function StorageInfo() {
  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getRequestAxios(getStorageInfoAPI);
        if (response.data.success) {
          setStorageInfo(response.data.data);
        }
      } catch (error) {
        toast.success(error.response.data.message);
      }
    })();
  }, []);

  return (
  <div className="text-white">
   {data && <p>Available Space : {storageInfo.availableStorage} MB </p>}
   {data && <p>Total Space : {storageInfo.totalStorage} MB </p>}
    </div>
);
}
