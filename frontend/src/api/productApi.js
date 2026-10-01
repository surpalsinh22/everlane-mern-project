// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/products';

// export const createProduct = async (formData) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.post(
//     `${API_URL}/create`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };

// export const getProducts = async (params) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(API_URL, {
//     params,
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   return data;
// };

// export const getNewProducts = async (category) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(
//     `${API_URL}/new/${category}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };

// export const getProductById = async (id) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(`${API_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   return data;
// };

// export const updateProduct = async (id, formData) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.put(
//     `${API_URL}/${id}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };

// export const getClothingProducts = async (params = {}) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(
//     `${API_URL}/clothing`,
//     {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };

// export const getPantsAndDenimProducts = async (
//   params = {}
// ) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(
//     `${API_URL}/pants-denim`,
//     {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };

// export const getTopsAndSweaters = async () => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.get(
//     `${API_URL}/tops-sweaters`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return data;
// };



// export const deleteProduct = async (id) => {
//   const token = localStorage.getItem('accessToken');

//   const { data } = await axios.delete(`${API_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   return data;
// };

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Public APIs (Token ki zaroorat nahi hai)
export const getProducts = async (params) => {
  const { data } = await axios.get(API_URL, { params });
  return data;
};

export const getNewProducts = async (category, params = {}) => {
  const { data } = await axios.get(
    `${API_URL}/new/${category}`,
    { params }
  );

  return data;
};

export const getProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const getClothingProducts = async (params = {}) => {
  const { data } = await axios.get(`${API_URL}/clothing`, { params });
  return data;
};

export const getPantsAndDenimProducts = async (params = {}) => {
  const { data } = await axios.get(`${API_URL}/pants-denim`, { params });
  return data;
};

export const getTopsAndSweaters = async () => {
  const { data } = await axios.get(`${API_URL}/tops-sweaters`);
  return data;
};

// Admin Protected APIs (Token zaroori hai)
export const createProduct = async (formData) => {
  const token = localStorage.getItem('accessToken');
  const { data } = await axios.post(`${API_URL}/create`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const updateProduct = async (id, formData) => {
  const token = localStorage.getItem('accessToken');
  const { data } = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem('accessToken');
  const { data } = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};