import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

import { ErrorRes } from './types/common';
import { useMutation } from '@tanstack/react-query';
import { createAsset, register, verifyAsset } from './services';
import { VerifyAssetRes } from './types/assets';
import { UserData } from './context/AuthContext';

export const useErrorHandler = () => {
  return (err: Error) => {
    const error = err as AxiosError<ErrorRes>;

    const getErrorMessage = (res: AxiosResponse<ErrorRes> | undefined) => {
      if (!navigator.onLine) {
        return 'Check your internet connection';
      }

      if (Array.isArray(res?.data.message)) {
        return res?.data.message[0] || 'Something went wrong';
      }

      return res?.data.message || 'Something went wrong';
    };

    toast.error(getErrorMessage(error.response));
  };
};

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

export const useRegister = (callback: () => void) => {
  const errorHandler = useErrorHandler();
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      callback();
    },
    onError: (err) => {
      errorHandler(err);
    }
  });
};
