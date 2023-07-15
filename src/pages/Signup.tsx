import AlertMessage from '@/components/AlertMessage';
import { createUser } from '@/redux/features/user/userSlice';
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

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isError, error } = useAppSelector((state) => state.user);
  
  // ALERT MESSAGE ACTION START
  const [alert, setAlert] = React.useState('');
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
    re_password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^\S*$/, 'Please avoid white space')
      .matches(/[A-Z]/, 'Minimum 1 capital letter')
      .matches(/[a-z]/, 'Minimum 1 small letter')
      .matches(
        /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/,
        'Minimum 1 special character'
      )
      .min(8, 'Minimum characters should be 8')
      .max(32, 'Maximum characters should be 32')
      .required('Password is required'),
    re_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Password does not matches')
      .required('Re_type password is required'),
  });

  const onSubmit = (
    values: { email: string; password: string },
    props: { resetForm: () => void }
  ) => {
    const formReset = () => {
      props.resetForm();
    };
    dispatch(createUser({ email: values.email, password: values.password }));

    setAlert('');
    if (isLoading) {
      formReset();
    }
    if (isError) {
      setAlert(error);
      handleAlertClick();
    } else {
      setAlert('Successfully logged in');
      handleAlertClick();
      navigate('/');
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showRePassword, setShowRePassword] = React.useState(false);
  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };
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
                    Registration
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
                    error={formik.errors.password && formik.touched.password}
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
                  <FormControl
                    error={
                      formik.errors.re_password && formik.touched.re_password
                    }
                    variant="outlined"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="re_password_input">
                      Re_type Password
                    </InputLabel>
                    <Field
                      as={OutlinedInput}
                      label="Re_type Password"
                      id="re_password_input"
                      name="re_password"
                      type={showRePassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowRePassword}
                            edge="end"
                          >
                            {showRePassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      <ErrorMessage name="re_password" />
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
                    Have an account? <Link to="/login"> Login</Link>
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

export default Signup;
