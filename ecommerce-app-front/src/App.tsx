import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Home, SignIn, SignUp } from './pages';
import { Box, Button } from '@mui/material';

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // px: 2,
        }}
      >
        <Button component={Link} to="/" variant="outlined" sx={{ mb: 4, display: 'block' }}>
          Home
        </Button>

        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
