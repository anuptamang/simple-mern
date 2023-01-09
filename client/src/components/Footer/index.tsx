import { Container, Grid } from '@mui/material';
import NavLink from 'components/UI/NavLink';

const Footer = () => {
  return (
    <footer>
      <Container sx={{ py: '50px' }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={12} lg={3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            reprehenderit esse ab nemo nesciunt perferendis alias, molestias
            culpa est eligendi dolor quis, libero quidem non, vitae eveniet
            blanditiis saepe debitis.
          </Grid>
          <Grid item xs={12} lg={5}>
            <NavLink
              sx={{ color: '#fff', '&:hover': { textDecoration: 'underline' } }}
              href={'/privacy-policy'}
            >
              Privacy Policy
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
