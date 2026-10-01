import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";


// CREATE ORDER

export const createOrder = async () => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axios.post(
    API_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


// GET ALL ORDERS - ADMIN

export const getAllOrders = async () => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};