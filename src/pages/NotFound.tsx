import { Stack, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Stack
      direction="row"
      justifyContent="Center"
      alignItems="center"
      spacing={2}
      sx={{
        p: 6,
      }}
    >
      <Typography variant="h2" color="red" align="center" gutterBottom>
        Page Not Found Not Found!
      </Typography>
    </Stack>
  );
}
