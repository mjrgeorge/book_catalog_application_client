import { IBook } from '@/types/globalTypes';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <Grid item xs>
      <Card variant="outlined" sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Title: {book?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            Author: {book?.author}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            Genre: {book?.genre}
          </Typography>
          <Typography variant="body2">
            Publication Year: {book?.publicationYear}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link
              to={`/book/${book?.id}`}
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
