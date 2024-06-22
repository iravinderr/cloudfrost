import React, { useState, useEffect } from "react";
import { getProfileAPI, updateProfileAPI } from "../services/apis";
import { getRequestAxios, putRequestAxios } from "../services/requests";
import { Loader } from "../components";
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    DOB: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await getRequestAxios(getProfileAPI, null, accessToken);

      if (response.data.success) {
        setProfile(response.data.data);

        // Populate form data including DOB
        setFormData({
          fullName: response.data.data.fullName,
          email: response.data.data.email,
          phone: response.data.data.phone || "",
          gender: response.data.data.gender || "",
          DOB: response.data.data.DOB ? new Date(response.data.data.DOB).toISOString().split('T')[0] : "", // Format DOB as ISO date string for input[type="date"]
        });
        
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const contentType = "multipart/form-data";

      // Exclude email from the formData before submission
      const { email, ...restFormData } = formData;

      const response = await putRequestAxios(updateProfileAPI, restFormData, null, accessToken, contentType);
      if (response.data.success) {
        toast.success(response.data.message);
        setEditMode(false);
        fetchProfile();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <Loader />
  }

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
              disabled // Make email field uneditable
              className="border-gray-300 border rounded-md px-3 py-2 mt-1 bg-gray-200 w-full"
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
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!editMode}
              className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
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
              <div className="w-full flex">
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
                    fetchProfile();
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
