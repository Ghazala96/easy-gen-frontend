import { CreateAssetReq, CreateAssetRes, VerifyAssetReq, VerifyAssetRes } from '../types/asset';
import { axiosInstance } from '../utils';

export const createAsset = async (data: CreateAssetReq): Promise<CreateAssetRes> => {
  const url = 'assets';
  const res = await axiosInstance.post<CreateAssetRes>(url, data);
  return res.data;
};

export const verifyAsset = async (data: VerifyAssetReq): Promise<VerifyAssetRes> => {
  const { submitId, ...body } = data;
  const url = `assets/${submitId}/verify`;
  const res = await axiosInstance.post<VerifyAssetRes>(url, body);
  return res.data;
};
