import { useQuery } from '@tanstack/react-query';

import { getUserProfile } from '../api';
import { useAuth } from '../context/AuthContext';

export const useUserProfile = () => {
  const { jwtTokens } = useAuth();
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(jwtTokens!.accessToken),
    retry: 1
  });
};
