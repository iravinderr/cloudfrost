import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getRequestAxios } from "../../services/requests";
import { getStorageInfoAPI } from "../../services/apis";
import toast from "react-hot-toast";

export default function StorageInfo() {
  const [storageInfo, setStorageInfo] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getRequestAxios(getStorageInfoAPI);
        console.log("response -> ", response);
        if (response.data.success) {
          const storageInfo = response.data.data;
          setStorageInfo(storageInfo);
          setData({
            labels: ['Used Storage', 'Available Storage'],
            datasets: [{
              label: 'Storage Info',
              data: [storageInfo.totalStorage - storageInfo.availableStorage, storageInfo.availableStorage],
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
          });
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
