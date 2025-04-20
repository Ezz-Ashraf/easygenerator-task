import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInUser } from '../../services';
import { SignInPayload } from '../../types';
import { useSnackbar } from 'notistack';
import axios from 'axios';

export function SignIn() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInPayload>({ mode: 'all' });

  const onSubmit: SubmitHandler<SignInPayload> = async (inputData) => {
    try {
      const { data } = await signInUser(inputData);
      const token = data.token;
      localStorage.setItem('token', token);

      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        enqueueSnackbar('Invalid email or password', { variant: 'error' });
      } else {
        enqueueSnackbar('Unexpected error, please try again', { variant: 'error' });
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Invalid email format',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register('password', {
            required: 'Password is required',
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>

        <Typography align="center" variant="body2">
          Don’t have an account?{' '}
          <Link component={RouterLink} to="/signup">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
