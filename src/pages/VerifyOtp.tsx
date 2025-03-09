import { TextField, Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth, UserData } from '../context/AuthContext';
import { useVerifyAsset } from '../hooks/useAsset';
import { useLogin, useRegister } from '../hooks/useAuth';
import { VerifyAssetRes } from '../types/asset';
import { LoginRes, RegisterRes } from '../types/auth';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { submitId, from } = location.state || {};
  const { userData, setUserData, setJwtTokens } = useAuth();

  const handleVerifyAssetSuccess = (data: VerifyAssetRes, userData: UserData) => {
    const claimId = data.claimId;

    if (from === 'register') {
      const registerPayload = {
        claimIds: [claimId],
        name: userData!.name!,
        password: userData.password
      };
      register(registerPayload);
    } else if (from === 'login') {
      const loginPayload = {
        claimIds: [claimId],
        password: userData!.password
      };
      login(loginPayload);
    }
  };

  const handleAuthSuccess = (data: RegisterRes | LoginRes) => {
    setUserData(null);
    setJwtTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    navigate('/dashboard');
  };

  const { mutate: register, isPending: registering } = useRegister(handleAuthSuccess);
  const { mutate: login, isPending: loggingIn } = useLogin(handleAuthSuccess);
  const { mutate: verifyAsset, isPending: verifying } = useVerifyAsset(
    handleVerifyAssetSuccess,
    userData!
  );

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const onSubmit = () => {
    if (!submitId) {
      toast.error('Missing submit ID. Please restart the process.');
      return;
    }
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) {
      toast.error('OTP must be 6 digits.');
      return;
    }

    const verifyAssetPayload = {
      submitId,
      code: finalOtp
    };
    verifyAsset(verifyAssetPayload);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5, textAlign: 'center' }}>
      <Typography variant="h5" fontWeight={600}>
        Enter OTP
      </Typography>
      <Typography variant="body2">Enter the 6-digit OTP sent to your email</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {otp.map((value, index) => (
            <TextField
              key={index}
              id={`otp-${index}`}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
              sx={{ width: 40 }}
            />
          ))}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={verifying || registering || loggingIn}
          sx={{ mt: 2 }}
        >
          {verifying
            ? 'Verifying...'
            : registering
              ? 'Registering...'
              : loggingIn
                ? 'Logging in...'
                : 'Verify'}
        </Button>
      </form>
    </Box>
  );
};

export default VerifyOtp;
