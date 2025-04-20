import { Container, Typography, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services';

export function Home() {
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuthStatus() {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handlePrimary = () => {
    
    if (isAuthenticated) {
      //logout functionality
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } else {
      nav('/signin');
    }
  };

  if (loading) {
    return <p>...loading</p>;
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom>
      Welcome to the application.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handlePrimary}>
          {isAuthenticated ? 'Log Out' : 'Sign In'}
        </Button>

        {!isAuthenticated && (
          <Button variant="outlined" onClick={() => nav('/signup')}>
            Sign Up
          </Button>
        )}
      </Stack>
    </Container>
  );
}
