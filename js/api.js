import axios from "axios";

axios.defaults.baseURL =
  "https://be-simple-shop-production.up.railway.app/api/";

export const getCategories = async () => {
  try {
    const response = await axios.get("categories");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get("products");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCart = async () => {
  try {
    const response = await axios.post("cart");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async (data) => {
  try {
    const response = await axios.post("orders", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
