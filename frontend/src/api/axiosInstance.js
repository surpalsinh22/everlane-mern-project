// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Apne backend ka base URL
//   withCredentials: true,                // Refresh token cookie pass karne ke liye
// });

// export default API;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Access token automatically bhejega
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Access token expire hone par refresh karega
API.interceptors.response.use(
  (res) => res,

  async (error) => {
    const request = error.config;

    if (
      error.response?.status === 401 &&
      !request._retry &&
      !request.url.includes('/auth/refresh')
    ) {
      request._retry = true;

      try {
        const res = await API.post('/auth/refresh');

        const newToken = res.data.accessToken;

        localStorage.setItem('accessToken', newToken);

        request.headers.Authorization = `Bearer ${newToken}`;

        return API(request);
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;