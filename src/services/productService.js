import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const getToken = () => localStorage.getItem("token");

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createProduct = async (productData) => {
  const token = getToken();
  const res = await axios.post(API_URL, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const token = getToken();
  const res = await axios.put(`${API_URL}/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
