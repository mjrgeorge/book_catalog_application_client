import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';

function Footer() {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ xs: 'column', sm: 'row' }}
      sx={{ fontSize: '12px' }}
      spacing={2}
    >
      <Grid sx={{ order: { xs: 2, sm: 1 } }}>
        <Link href="#" underline="none">
          © mjrgeorge
        </Link>
      </Grid>
      <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
        <Grid>
          <Link href="#" underline="none">
            Privacy Policy
          </Link>
        </Grid>
        <Grid>
          <Link href="#" underline="none">
            Terms and Condition
          </Link>
        </Grid>
        <Grid>
          <Link href="#" underline="none">
            Sitemap
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
