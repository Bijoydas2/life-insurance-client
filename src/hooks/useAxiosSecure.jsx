import axios from 'axios';
import React from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});

const useAxiosSecure = () => {
  const { user, SignOut } = UseAuth();
  const navigate = useNavigate();

  // ✅ Request Interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Response Interceptor with proper error handling
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error?.response?.status;
      console.log('inside res interceptor', status);

      if (status === 403) {
        navigate('/forbidden');
      } else if (status === 401) {
        SignOut()
          .then(() => {
            navigate('/login');
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
