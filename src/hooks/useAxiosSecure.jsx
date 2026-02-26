import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken} `; //${user.accessToken}
      }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          logout().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logout, navigate]);
  return instance;
};

export default useAxiosSecure;
