// src/pages/SignUpPage.tsx
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignUpPayload } from '../../types';
import { signUpUser } from '../../services';
import { useSnackbar } from 'notistack';

type SignUpFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUp() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isValid },
  } = useForm<SignUpFormInputs>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<SignUpPayload> = async (data) => {
    try {
      let gotData =await signUpUser(data);
      const token = gotData.data.token;
      localStorage.setItem('token', token);
      console.log('Submitted:', data);
      navigate('/');
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Unexpected error, please try again', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {/* Name */}
        <TextField
          label="Name"
          fullWidth
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Email */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="text"
          fullWidth
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{8,}$/,
              message: 'Password must be ≥8 chars, include letter, number & special char',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting || isLoading || !isValid}
        >
          Sign Up
        </Button>

        <Typography align="center" variant="body2">
          Already have an account?
          <Link component={RouterLink} to="/signin">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
