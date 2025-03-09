import { axiosInstance } from './axiosInstance';
import { CreateAssetReq, CreateAssetRes, VerifyAssetReq, VerifyAssetRes } from './types/assets';
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from './types/auth';

export const createAsset = async (data: CreateAssetReq): Promise<CreateAssetRes> => {
  const url = 'assets';
  const res = await axiosInstance.post<CreateAssetRes>(url, data);
  return res.data;
};

export const verifyAsset = async (data: VerifyAssetReq): Promise<VerifyAssetRes> => {
  const { submitId, ...body } = data;
  const url = `assets/${submitId}/verify`;
  const res = await axiosInstance.post(url, body);
  return res.data;
};

export const register = async (data: RegisterReq): Promise<RegisterRes> => {
  const url = 'auth/register';
  const res = await axiosInstance.post<RegisterRes>(url, data);
  return res.data;
};

export const login = async (data: LoginReq): Promise<LoginRes> => {
  const url = 'auth/login';
  const res = await axiosInstance.post(url, data);
  return res.data;
};
