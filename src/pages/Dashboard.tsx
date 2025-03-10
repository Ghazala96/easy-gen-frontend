import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUser';

const Dashboard = () => {
  const navigate = useNavigate();
  const { jwtTokens, setJwtTokens, setUserData } = useAuth();
  const { data: user, isLoading, error } = useUserProfile();

  const handleLogoutSuccess = () => {
    navigate('/login');
  };
  const { mutate } = useLogout(handleLogoutSuccess);

  const onClick = async () => {
    mutate(jwtTokens!.accessToken);

    setJwtTokens(null);
    setUserData(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load user data</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, gap: 2 }}>
      <Typography variant="h5" fontWeight={600}>
        {user
          ? `Welcome ${user.name.first} ${user.name.last}, this is your dashboard!`
          : 'Welcome!'}
      </Typography>
      <Button variant="contained" color="secondary" onClick={onClick}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
