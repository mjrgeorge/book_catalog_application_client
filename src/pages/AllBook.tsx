import BookCard from '@/components/BookCard';
import {
  useGetBooksQuery,
  usePostBookMutation,
} from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
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
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginBottom: theme.spacing(3),
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid black',
    borderRadius: '5px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AllBook = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  const [postBook, { isLoading: isCreateLoading }] = usePostBookMutation();

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

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (searchValue: string): void => {
    setSearchTerm(searchValue);
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
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Search>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {data?.data
          ?.filter((item: IBook) => {
            for (const value of Object.values(item)) {
              if (
                typeof value === 'string' &&
                new RegExp(searchTerm, 'i').test(value)
              ) {
                return true;
              }
            }
            return false;
          })
          ?.map((book: IBook) => (
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
