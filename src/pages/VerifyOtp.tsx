import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
// import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyAsset, useRegister } from '../hooks';
import { useAuth, UserData } from '../context/AuthContext';
import { toast } from 'sonner';
import { VerifyAssetRes } from '../types/assets';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { submitId, from } = location.state || {};
  const { userData } = useAuth();

  const handleVerifyAssetSuccess = (data: VerifyAssetRes, userData: UserData) => {
    const claimId = data.claimId;

    if (from === 'register') {
      const registerPayload = {
        claimIds: [claimId],
        name: userData.name,
        password: userData.password
      };
      register(registerPayload);
    }
  };

  const handleRegisterSuccess = () => {
    navigate('/dashboard');
  };

  const { mutate: register, isPending: registering } = useRegister(handleRegisterSuccess);
  const { mutate: verifyAsset, isPending: verifying } = useVerifyAsset(
    handleVerifyAssetSuccess,
    userData!
  );

  // const { mutate: login, isPending: loggingIn } = useLogin();
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
          disabled={verifying || registering}
          sx={{ mt: 2 }}
        >
          {verifying ? 'Verifying...' : registering ? 'Registering...' : 'Verify'}
        </Button>
      </form>
    </Box>
  );
};

export default VerifyOtp;
