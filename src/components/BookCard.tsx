import { IBook } from '@/types/globalTypes';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <Grid item xs>
      <Card variant="outlined" sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {book?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {book?.author}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {book?.genre}
          </Typography>
          <Typography variant="body2">
            Publication Year
            <br />
            {book?.publicationYear}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link
              to={`/book/${book?._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Details
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
