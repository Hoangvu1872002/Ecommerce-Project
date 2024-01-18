import axios from '../axios'

export const apiRegister = (data) => axios({
    url: "/users/register",
    method: 'post',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data,  
})
export const apiLogin = (data) => axios({
    url: "/users/login",
    method: 'post',
    data
})