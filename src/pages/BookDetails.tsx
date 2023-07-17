import AlertMessage from '@/components/AlertMessage';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
  useUpdateBookMutation,
  useUpdateBookWithReviewMutation,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useSingleBookQuery(id);

  const [updateBook, { isLoading: isUpdateLoading, isSuccess, isError }] =
    useUpdateBookMutation();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const initialValues: IBook = {
    title: data?.data?.title,
    author: data?.data?.author,
    genre: data?.data?.genre,
    publicationYear: data?.data?.publicationYear,
    id: 0,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This is required'),
    author: Yup.string().required('This is required'),
    genre: Yup.string().required('This is required'),
    publicationYear: Yup.number().required('This is required'),
  });

  const onSubmit = (values: IBook, props: { resetForm: () => void }) => {
    const formReset = () => {
      props.resetForm();
    };
    const options = {
      id: id,
      title: values.title,
      author: values.author,
      genre: values.genre,
      publicationYear: values.publicationYear,
      userEmail: user.email,
    };

    updateBook(options);
    formReset();
    handleClose();
  };

  const [
    deletePost,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
    },
  ] = useDeleteBookMutation();

  const [confirmationOpen, setConfirmationOpen] = React.useState(false);

  const handleConfirmationClickOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmDelete = () => {
    deletePost(id);
    setConfirmationOpen(false);
  };

  const [
    updateBookWithReview,
    {
      isLoading: isUpdateReviewLoading,
      isSuccess: isReviewSuccess,
      isError: isReviewError,
    },
  ] = useUpdateBookWithReviewMutation();
  const [reviewText, setReviewText] = React.useState('');

  const handleReview = () => {
    updateBookWithReview({ id: data?.data?.id, title: reviewText });
    setReviewText('');
  };

  React.useEffect(() => {
    if (isSuccess || isDeleteSuccess || isReviewSuccess) {
      setAlert('Success');
      handleAlertClick();
    }
    if (isError || isDeleteError || isReviewError) {
      setAlert('Something went wrong');
      handleAlertClick();
    }
  }, [
    isDeleteError,
    isDeleteSuccess,
    isError,
    isReviewError,
    isReviewSuccess,
    isSuccess,
  ]);

  return (
    <Container maxWidth="lg">
      <main>
        <Typography variant="h5" align="center" gutterBottom>
          Books Details
        </Typography>
        {data?.data?.title && user?.email === data?.data?.userEmail && (
          <Stack direction="row" spacing={2} sx={{ my: 3 }}>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<EditIcon />}
              onClick={handleClickOpen}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleConfirmationClickOpen}
            >
              Delete
            </Button>
          </Stack>
        )}
        <Card variant="elevation" sx={{ minHeight: '50vh', p: 3 }}>
          {data?.data?.title && (
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Title: {data?.data?.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1.5 }}
                color="text.secondary"
              >
                Author: {data?.data?.author}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1.5 }}
                color="text.secondary"
              >
                Genre: {data?.data?.genre}
              </Typography>
              <Typography variant="body1">
                Publication Year: {data?.data?.publicationYear}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ my: 3 }}>
                <TextField
                  label="Review"
                  value={reviewText}
                  variant="outlined"
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <Button variant="contained" onClick={handleReview}>
                  Send
                </Button>
              </Stack>
              {data?.data?.reviews?.length > 0 && (
                <Stack spacing={1} sx={{ my: 3 }}>
                  {data?.data?.reviews?.map(
                    (
                      review: { title: string; userEmail: string },
                      index: number
                    ) => (
                      <Typography
                        key={index}
                        color="text.secondary"
                        gutterBottom
                      >
                        {index + 1}. {review?.title}
                      </Typography>
                    )
                  )}
                </Stack>
              )}
            </CardContent>
          )}
          {!data?.data?.title && !isLoading && (
            <CardContent>
              <Typography variant="h6" align="center" color="red" gutterBottom>
                Data Not Found!
              </Typography>
            </CardContent>
          )}
          <CardActionArea>
            <Button
              variant="outlined"
              size="small"
              color="info"
              onClick={() => navigate('/')}
            >
              Back to Book List
            </Button>
          </CardActionArea>
        </Card>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
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
                            Book Edit
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="title"
                            label="Book Title"
                            fullWidth
                            error={formik.errors.title && formik.touched.title}
                            helperText={<ErrorMessage name="title" />}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="author"
                            label="Book Author"
                            fullWidth
                            error={
                              formik.errors.author && formik.touched.author
                            }
                            helperText={<ErrorMessage name="author" />}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="genre"
                            label="Book Genre"
                            fullWidth
                            error={formik.errors.genre && formik.touched.genre}
                            helperText={<ErrorMessage name="genre" />}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            type="number"
                            name="publicationYear"
                            label="Publication Year"
                            fullWidth
                            error={
                              formik.errors.publicationYear &&
                              formik.touched.publicationYear
                            }
                            helperText={<ErrorMessage name="publicationYear" />}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button type="submit" variant="contained" fullWidth>
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Container>
          </DialogContent>
        </Dialog>
        <Dialog
          open={confirmationOpen}
          onClose={handleConfirmationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this book?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose}>No</Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          isLoading ||
          isUpdateLoading ||
          isDeleteLoading ||
          isUpdateReviewLoading
        }
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

export default BookDetails;
