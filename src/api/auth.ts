import { LoginReq, LoginRes, RegisterReq, RegisterRes } from '../types/auth';
import { axiosInstance } from '../utils';

export const register = async (data: RegisterReq): Promise<RegisterRes> => {
  const url = 'auth/register';
  const res = await axiosInstance.post<RegisterRes>(url, data);
  return res.data;
};

export const login = async (data: LoginReq): Promise<LoginRes> => {
  const url = 'auth/login';
  const res = await axiosInstance.post<LoginRes>(url, data);
  return res.data;
};

export const logout = async (accessToken: string): Promise<void> => {
  const url = 'auth/logout';
  await axiosInstance.post(url, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
};
