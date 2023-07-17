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
  CardContent,
  CircularProgress,
  Container,
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

  const [updateBook, { isLoading: isUpdateLoading }] = useUpdateBookMutation();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const [deletePost, { isLoading: isDeleting }] = useDeleteBookMutation();

  const [
    updateBookWithReview,
    { isLoading: isUpdateReviewLoading, isSuccess, isError },
  ] = useUpdateBookWithReviewMutation();
  const [reviewText, setReviewText] = React.useState('');

  const handleReview = () => {
    updateBookWithReview({ id: data?.data?.id, title: reviewText });
    setReviewText('');
  };

  return (
    <Container maxWidth="lg">
      <main>
        <Typography variant="h5" align="center" gutterBottom>
          Books Details
        </Typography>
        {user?.email === data?.data?.userEmail && (
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
              onClick={() => deletePost(id).then(() => navigate('/'))}
            >
              Delete
            </Button>
          </Stack>
        )}
        <Card variant="elevation">
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {data?.data?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              {data?.data?.author}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              {data?.data?.genre}
            </Typography>
            <Typography variant="body1">
              Publication Year
              <br />
              {data?.data?.publicationYear}
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
                    <Typography key={index} color="text.secondary" gutterBottom>
                      {index + 1}. {review?.title}
                    </Typography>
                  )
                )}
              </Stack>
            )}
          </CardContent>
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
                            New Book Entry
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
      </main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          isLoading || isUpdateLoading || isDeleting || isUpdateReviewLoading
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default BookDetails;
