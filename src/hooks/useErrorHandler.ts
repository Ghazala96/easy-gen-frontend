import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

import { ErrorRes } from '../types/common';

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
