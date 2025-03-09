import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useCreateAsset } from '../hooks';
import { AssetOperation, AssetType, CreateAssetReq } from '../types/assets';
import { toast } from 'sonner';

const registerSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character')
});

const Register = () => {
  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const handleSuccess = (submitId: string, otp?: string) => {
    toast.success(`OTP is ${otp}`, { duration: 10000 });
    navigate('/verify-otp', { state: { submitId, from: 'register' } });
  };

  const { mutate, isPending } = useCreateAsset(handleSuccess);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: any) => {
    setUserData({
      name: {
        first: data.firstName,
        last: data.lastName
      },
      email: data.email,
      password: data.password
    });

    const payload: CreateAssetReq = {
      type: AssetType.Email,
      data: { email: data.email, operation: AssetOperation.Register }
    };
    mutate(payload);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5, textAlign: 'center' }}>
      <Typography variant="h5" fontWeight={600}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message || ''}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
            {isPending ? 'Processing...' : 'Register'}
          </Button>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
