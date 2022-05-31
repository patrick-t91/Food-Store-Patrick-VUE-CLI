import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;

const apiServices = {
  getUsers: async () => {
    try {
      const res = await axios.get(`${apiUrl}/Users`);
      return res.data;
    } catch (err) {
      document.write(err);
    }
  },
  postUser: async (newUser) => {
    try {
      const res = await axios.post(`${apiUrl}/Users`, newUser);
      return res.data;
    } catch (err) {
      document.write(err);
    }
  },
  getProducts: async () => {
    try {
      const res = await axios.get(`${apiUrl}/Products`);
      console.log(res.data)
      return res.data;
    } catch (err) {
      document.write(err);
    }
  },
  postProduct: async (newProduct) => {
      try {
          const res = await axios.post(`${apiUrl}/Products`, newProduct);
          return res.data
      } catch (err) {
          document.write(err)
      }
  },
  getUserOrders: async (userId, newUser) => {
      try {
          const res = await axios.get(`${apiUrl}/Users/${userId}/Orders`, newUser);
          return res.data
      } catch (err) {
          document.write(err)
      }
  },
  postUserOrder: async (userId, newOrder) => {
      try {
          const res = await axios.post(`${apiUrl}/Users/${userId}/Orders`, newOrder);
          return res.data
      } catch(err) {
          document.write(err)
      }
  }
};

export default apiServices;
