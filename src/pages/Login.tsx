import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuth } from '../context/AuthContext';
import { useCreateAsset } from '../hooks/useAsset';
import { AssetOperation, AssetType, CreateAssetReq } from '../types/asset';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const handleSuccess = (submitId: string, otp?: string) => {
    toast.success(`OTP is ${otp}`, { duration: 10000 });
    navigate('/verify-otp', { state: { submitId, from: 'login' } });
  };

  const { mutate, isPending } = useCreateAsset(handleSuccess);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginSchema) => {
    setUserData({ email: data.email, password: data.password });

    const payload: CreateAssetReq = {
      type: AssetType.Email,
      data: { email: data.email, operation: AssetOperation.Login }
    };
    mutate(payload);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5, textAlign: 'center' }}>
      <Typography variant="h5" fontWeight={600}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                helperText={errors.password?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
