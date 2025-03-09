import { GetUserProfileRes } from '../types/user';
import { axiosInstance } from '../utils';

export const getUserProfile = async (accessToken: string): Promise<GetUserProfileRes> => {
  const url = 'users/me';
  const res = await axiosInstance.get<GetUserProfileRes>(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return res.data;
};
