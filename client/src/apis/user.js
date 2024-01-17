import axios from '../axios'

export const apiRegister = (data) => axios({
    url: "/users/register",
    method: 'post',
    withCredentials: true,
    data,  
})
export const apiLogin = (data) => axios({
    url: "/users/login",
    method: 'post',
    data
})