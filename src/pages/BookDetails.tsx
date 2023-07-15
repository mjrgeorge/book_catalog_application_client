import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { Card, CardContent, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const { data } = useSingleBookQuery(id);
  return (
    <Container maxWidth="lg">
      <main>
        <Typography variant="h5" align="center" gutterBottom>
          Books Details
        </Typography>
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
            <Typography variant="body2">
              Publication Year
              <br />
              {data?.data?.publicationYear}
            </Typography>
          </CardContent>
        </Card>
      </main>
    </Container>
  );
};

export default BookDetails;
