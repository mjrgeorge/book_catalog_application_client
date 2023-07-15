import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';
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
        <Stack direction="row" spacing={2} sx={{my: 3}}>
          <Button variant="outlined" color="warning" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
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
