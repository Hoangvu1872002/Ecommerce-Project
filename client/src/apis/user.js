import axios from "../axios";

export const apiRegister = async (data) =>
  axios({
    url: "/users/register",
    method: "post",
    // headers:{
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    // },
    // // mode: 'cors'
    // credentials: 'include',
    // withCredentials: true,
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/users/current",
    method: "get",
  });

export const apiLogin = (data) =>
  axios({
    url: "/users/login",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/users/forgotpassword",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/users/resetpassword",
    method: "put",
    data,
  });

export const apiGetUsers = (params) =>
  axios({
    url: "/users/",
    method: "get",
    params,
  });

export const apiUpdateUser = (data, uid) =>
  axios({
    url: "/users/" + uid,
    method: "put",
    data,
  });

export const apiDeleteUser = (uid) =>
  axios({
    url: "/users/" + uid,
    method: "delete",
  });
