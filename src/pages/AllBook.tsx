import BookCard from '@/components/BookCard';
import {
  useGetBooksQuery,
  usePostBookMutation,
} from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import AddIcon from '@mui/icons-material/Add';
import {
  Backdrop,
  Button,
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
import * as Yup from 'yup';

const AllBook = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  const [postBook, { isLoading : isCreateLoading }] = usePostBookMutation();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: IBook = {
    title: '',
    author: '',
    genre: '',
    publicationYear: 2023,
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
      data: {
        title: values.title,
        author: values.author,
        genre: values.genre,
        publicationYear: values.publicationYear,
      },
    };

    postBook(options);
    formReset();
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ my: 3 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          All Books
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Book
        </Button>
      </Stack>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {data?.data?.map((book: IBook) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </Grid>
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
                          error={formik.errors.author && formik.touched.author}
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
                          name="publicationYear"
                          label="Publication Year"
                          type="number"
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isCreateLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default AllBook;
