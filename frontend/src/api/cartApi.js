import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";


// ===============================
// GET CART
// ===============================

export const getCart = async () => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};


// ===============================
// ADD TO CART
// ===============================

export const addToCart = async (cartData) => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axios.post(
    `${API_URL}/add`,
    cartData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


// ===============================
// INCREASE QUANTITY
// ===============================

export const increaseQuantity = async (itemId) => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axios.put(
    `${API_URL}/increase/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


// ===============================
// DECREASE QUANTITY
// ===============================

export const decreaseQuantity = async (itemId) => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axios.put(
    `${API_URL}/decrease/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


// ===============================
// REMOVE FROM CART
// ===============================

export const removeFromCart = async (itemId) => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axios.delete(
    `${API_URL}/remove/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};