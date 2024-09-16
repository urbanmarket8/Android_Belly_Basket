import axiosInstance from "./axiosInstance";


export const createOrder = async (orderDetails) => {
  try {
    const response = await axiosInstance.post("/orders/create-order", orderDetails);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Error creating order');
  }
};