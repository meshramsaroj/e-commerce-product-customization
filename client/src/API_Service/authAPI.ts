import type { ILoginProps } from "../pages/Login";
import axiosInstance from "./axiosInstance";

export const loginUser = (payload: ILoginProps) => {
  return axiosInstance.post("/auth/login", payload).then(res => {
    return res.data
  }).catch(error => error)
}

export const getLoginUserDetails = () => {
  return axiosInstance.get("/auth/user/me",).then(res => {
    return res.data?.data
  }).catch(error => error)
}

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout").then(res => res).catch(error => error)
}