import axios from './axiosConfig';

// LOGIN
export const loginUser = async (credentials) => {
  const res = await axios.post('/users/login', credentials);
  return res.data;
};

// REGISTER
export const registerUser = async (data) => {
  const res = await axios.post('/users/register', data);
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await axios.post('/users/logout');
  return res.data;
};

// PROFILE (GET)
export const getProfile = async () => {
  const res = await axios.get('/users/profile');
  return res.data;
};

// PROFILE (UPDATE)
export const updateProfile = async (data) => {
  const res = await axios.put('/users/profile', data);
  return res.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const res = await axios.post('/users/forgot-password', { email });
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (token, newPassword) => {
  const res = await axios.post(`/users/reset-password/${token}`, { newPassword });
  return res.data;
};



// DEBUG: Check stored password hash
export const checkPasswordHash = async (payload) => {
  const res = await axios.post('/users/debug-password', payload);
  return res.data;
};

// ADMIN: Get all users
export const getAllUsers = async () => {
  const res = await axios.get('/users/all-users');
  return res.data;
};

// ADMIN: dashboard stats
export const getDashboardStats = async () => {
  const res = await axios.get("/admin/dashboard");
  return res.data;
};
