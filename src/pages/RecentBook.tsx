import BookCard from '@/components/BookCard';
import { useGetRecentBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Backdrop, CircularProgress, Container, Grid } from '@mui/material';

const RecentBook = () => {
  const { data, isLoading } = useGetRecentBooksQuery(undefined);
  return (
    <Container maxWidth="lg">
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default RecentBook;
