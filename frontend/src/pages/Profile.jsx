import React, { useState, useEffect } from "react";
import axios from "axios";
import { getProfileAPI, updateProfileAPI } from "../services/apis"; // Assuming updateDetailsAPI is defined
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(getProfileAPI, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (response.data.success) {
        setProfile(response.data.data);
        // Populate form data with profile details
        setFormData({
          fullName: response.data.data.fullName,
          email: response.data.data.email,
          phone: response.data.data.phone || "",
          gender: response.data.data.gender || "",
          dob: response.data.data.dob || "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(updateProfileAPI, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditMode(false); // Disable edit mode after successful update
        fetchProfile(); // Fetch updated profile details
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={!editMode}
              className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
              className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!editMode}
              className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Gender:
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!editMode}
              className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              disabled={!editMode}
              className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="flex justify-end">
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit Details
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    fetchProfile(); // Reset form data on cancel
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
