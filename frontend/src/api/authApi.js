// import API from './axiosInstance';

// export const registerApi = async (data) => {
//   const res = await API.post('/auth/register', data);
//   return res.data;
// };

// export const loginApi = async (data) => {
//   const res = await API.post('/auth/login', data);
//   return res.data;
// };

// export const logoutApi = async () => {
//   const res = await API.post('/auth/logout');
//   return res.data;
// };

// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/auth';

// export const getUserCount = async () => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(
//     `${API_URL}/count`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };
// export const getUsers = async () => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(
//     `${API_URL}/users`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };


import API from './axiosInstance';

export const registerApi = async (data) => {
  const res = await API.post('/auth/register', data);
  return res.data;
};

export const loginApi = async (data) => {
  const res = await API.post('/auth/login', data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await API.post('/auth/logout');
  return res.data;
};


export const getUserCount = async () => {
  const { data } = await API.get('/auth/count');

  return data;
};

export const getUsers = async () => {
  const { data } = await API.get('/auth/users');

  return data;
};