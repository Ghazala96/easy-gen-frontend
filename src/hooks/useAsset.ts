import { useMutation } from '@tanstack/react-query';

import { useErrorHandler } from './useErrorHandler';
import { createAsset, verifyAsset } from '../api';
import { UserData } from '../context/AuthContext';
import { VerifyAssetRes } from '../types/asset';

export const useCreateAsset = (callback: (submitId: string, otp?: string) => void) => {
  const errorHandler = useErrorHandler();
  return useMutation({
    mutationFn: createAsset,
    onSuccess: (data) => callback(data.submitId, data.otp),
    onError: (err) => {
      errorHandler(err);
    }
  });
};

export const useVerifyAsset = (
  callback: (data: VerifyAssetRes, userData: UserData) => void,
  userData: UserData
) => {
  const errorHandler = useErrorHandler();
  return useMutation({
    mutationFn: verifyAsset,
    onSuccess: (data) => {
      callback(data, userData);
    },
    onError: (err) => {
      errorHandler(err);
    }
  });
};
