import AlertMessage from '@/components/AlertMessage';
import BookCard from '@/components/BookCard';
import {
  useGetBooksQuery,
  usePostBookMutation,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
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
  const { user } = useAppSelector((state) => state.user);

  const [postBook, { isLoading: isCreateLoading, isError, isSuccess }] =
    usePostBookMutation();

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
        userEmail: user.email,
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

  const [genreFilter, setGenreFilter] = React.useState('All');
  const [yearFilter, setYearFilter] = React.useState('');

  const uniqueGenres = Array.from(
    new Set(data?.data?.map((book: { genre: string }) => book.genre))
  );
  const uniqueYears = Array.from(
    new Set(
      data?.data?.map(
        (book: { publicationYear: number }) => book.publicationYear
      )
    )
  );

  React.useEffect(() => {
    if (isSuccess) {
      setAlert('Success');
      handleAlertClick();
    }
    if (isError) {
      setAlert('Something went wrong');
      handleAlertClick();
    }
  }, [isError, isSuccess]);

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
        {user?.email && (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add New Book
          </Button>
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
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
        <Box>
          <TextField
            select
            label="Genre"
            defaultValue="All"
            value={genreFilter as string}
            onChange={(e) => setGenreFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="All">All</MenuItem>
            {uniqueGenres.map((option) => (
              <MenuItem key={option as string} value={option as string}>
                {option as string}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Publication Year"
            defaultValue="All"
            value={yearFilter as string}
            onChange={(e) => setYearFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="All">All</MenuItem>
            {uniqueYears.map((option) => (
              <MenuItem key={option as string} value={option as string}>
                {option as string}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>
      {!data?.data?.length && !isLoading && (
        <Typography variant="h6" align="center" color="red" gutterBottom>
          Data Not Found!
        </Typography>
      )}
      {data?.data?.length > 0 && !isLoading && (
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
            ?.filter(
              (book: { genre: string; publicationYear: number }) =>
                (genreFilter === 'All' || book.genre === genreFilter) &&
                (isNaN(parseInt(yearFilter)) ||
                  book.publicationYear === parseInt(yearFilter))
            )
            ?.map((book: IBook) => (
              <BookCard key={book?.id} book={book} />
            ))}
        </Grid>
      )}

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

      {/* ALERT MESSAGE SHOW */}
      <AlertMessage
        handleAlertClose={handleAlertClose}
        alertOpen={alertOpen}
        alert={alert}
      />
    </Container>
  );
};

export default AllBook;
