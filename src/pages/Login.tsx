import AlertMessage from '@/components/AlertMessage';
import { loginUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, error } = useAppSelector(
    (state) => state.user
  );

  // ALERT MESSAGE ACTION START
  const [alert, setAlert] = React.useState<string | null>(null);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleAlertClick = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  // ALERT MESSAGE ACTION END

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values: { email: string; password: string }) => {
    dispatch(loginUser({ email: values.email, password: values.password }));
    setAlert('');
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    if (isError) {
      setAlert(error);
      handleAlertClick();
    }
    if (user.email && !isLoading) {
      setAlert('Successfully logged in');
      handleAlertClick();
      navigate('/');
    }
  }, [error, isError, isLoading, navigate, user.email]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Login
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    error={formik.errors.email && formik.touched.email}
                    helperText={<ErrorMessage name="email" />}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={
                      formik.errors.password && formik.touched.password
                        ? true
                        : undefined
                    }
                    variant="outlined"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="password_input">Password</InputLabel>
                    <Field
                      as={OutlinedInput}
                      label="Password"
                      id="password_input"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      <ErrorMessage name="password" />
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Signup
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center">
                    Do not have an account? <Link to="/signup"> Signup</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* ALERT MESSAGE SHOW */}
      <AlertMessage
        handleAlertClose={handleAlertClose}
        alertOpen={alertOpen}
        alert={alert}
      />
    </Container>
  );
};

export default Login;
