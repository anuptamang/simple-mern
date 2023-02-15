import { Container, Typography } from '@mui/material';
import Accordion from 'components/UI/Accordion';
import { Helmet } from 'react-helmet';

const data = [
  {
    title: 'Skills',
    content: 'HTML, CSS, JS',
  },
  {
    title: 'Education',
    content: 'MSc. Computer Science',
  },
];

const Portfolio = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | My App</title>
      </Helmet>
      <Container sx={{ py: '50px' }}>
        <Typography variant="h3" sx={{ marginBottom: '40px' }}>
          Portfolio
        </Typography>
        <Accordion data={data} />
      </Container>
    </>
  );
};

export default Portfolio;
