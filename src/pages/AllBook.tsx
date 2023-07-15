import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';

const AllBook = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
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

        <Button variant="outlined" startIcon={<AddIcon />}>
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
          <BookCard key={book?._id} book={book} />
        ))}
      </Grid>
    </Container>
  );
};

export default AllBook;
