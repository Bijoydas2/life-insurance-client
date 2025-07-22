import axios from 'axios';
import { useNavigate } from 'react-router';

import { useEffect } from 'react';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const { user, SignOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          SignOut().then(() => navigate('/login')).catch(() => {});
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user?.accessToken, navigate, SignOut]);

  return axiosSecure;
};

export default useAxiosSecure;
