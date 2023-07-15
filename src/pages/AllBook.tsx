import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Grid, Typography } from '@mui/material';

const AllBook = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(data, isLoading, error);
  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        All Books
      </Typography>
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
    </div>
  );
};

export default AllBook;
