// const backend_host = `http://localhost:4000`;
const backend_host = import.meta.env.VITE_BACKEND_HOST;
const api_version = '/api/v1';
const base_url = `${backend_host}${api_version}/user`;


// USER APIs
export const sendRegistrationOtpAPI = `${base_url}/register`;
export const confirmRegistrationAPI = `${base_url}/confirm-registration`;
export const loginAPI = `${base_url}/login`;
export const logoutAPI = `${base_url}/logout`;
export const verifyTokenAPI = `${base_url}/verify-token`;
export const refreshTokensAPI = `${base_url}/refresh-tokens`;
export const changePasswordAPI = `${base_url}/change-password`;
export const sendResetPasswordOtpAPI = `${base_url}/send-reset-password-otp`;
export const validateResetPasswordOtpAPI = `${base_url}/validate-reset-password-otp`;
export const resetPasswordAPI = `${base_url}/reset-password`;
export const getProfileAPI = `${base_url}/get-profile`;
export const updateProfileAPI = `${base_url}/update-profile`;
export const getStorageInfoAPI = `${base_url}/get-storage-info`;

// FOLDER APIs
export const createFolderAPI = `${base_url}/folder/create`;
export const getFoldersAPI = `${base_url}/folder/get`;
export const renameFolderAPI = `${base_url}/folder/rename`;
export const deleteFolderAPI = `${base_url}/folder/delete`;

// FILE APIs
export const uploadFileAPI = `${base_url}/file/upload`;
export const getFilesAPI = `${base_url}/file/get`;
export const renameFileAPI = `${base_url}/file/rename`;
export const deleteFileAPI = `${base_url}/file/delete`;