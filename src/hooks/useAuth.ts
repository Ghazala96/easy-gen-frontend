import { useMutation } from '@tanstack/react-query';

import { useErrorHandler } from './useErrorHandler';
import { login, logout, register } from '../api';
import { LoginRes, RegisterRes } from '../types/auth';

export const useRegister = (callback: (data: RegisterRes) => void) => {
  const errorHandler = useErrorHandler();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      callback(data);
    },
    onError: (err) => {
      errorHandler(err);
    }
  });
};

export const useLogin = (callback: (data: LoginRes) => void) => {
  const errorHandler = useErrorHandler();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      callback(data);
    },
    onError: (err) => {
      errorHandler(err);
    }
  });
};

export const useLogout = (callback: () => void) => {
  const errorHandler = useErrorHandler();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      callback();
    },
    onError: (err) => {
      errorHandler(err);
    }
  });
};
