import { Container, Grid } from '@mui/material';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Container maxWidth="xl" sx={{my: 3}}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs>
          <Link href="#" underline="none">
            © mjrgeorge
          </Link>
        </Grid>
        <Grid item xs>
          <Link href="#" underline="none">
            Privacy Policy
          </Link>
        </Grid>
        <Grid item xs>
          <Link href="#" underline="none">
            Terms and Condition
          </Link>
        </Grid>
        <Grid item xs>
          <Link href="#" underline="none">
            Sitemap
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
