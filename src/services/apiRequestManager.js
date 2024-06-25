import axios from 'axios';
import { toast } from 'react-toastify';

export const apiCall = async (url, method, data, config) => {
  try {
    const response = await axios({ url, method, data, ...config });
    if (response.data.error) {
      toast.error(response.data.error);
      return null;
    }
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
    return err.response.data;
  }
};
