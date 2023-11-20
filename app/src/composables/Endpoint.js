// src/composables/Endpoint.js
import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';

const Endpoint = () => {
  const userData = LocalStorage.getItem('userData');

  const getWithToken = async (url) => {
    const options = {
      headers: { Authorization: `Bearer ${userData.token}` },
    };

    try {
      const response = await api.get(url, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const postWithToken = async (url, filters, options) => {

    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    };

    try {
      const response = await api.post(url, {filters, options}, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getWithToken,
    postWithToken,
  };
};

export default Endpoint;