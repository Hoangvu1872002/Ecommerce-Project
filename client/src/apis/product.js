import axios from "../axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/products",
    method: "get",
    params,
  });

export const apiGetProduct = (pid) =>
  axios({
    url: "/products/" + pid,
    method: "get",
  });

export const apiRating = (data) =>
  axios({
    url: "/products/rating",
    method: "put",
    data,
  });
