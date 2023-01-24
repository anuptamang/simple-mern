import { Typography } from '@mui/material';
import ContentBox from 'components/UI/ContentBox';
import UsersList from 'features/UsersList';
import { Helmet } from 'react-helmet';

const UserSettings = () => {
  return (
    <>
    <Helmet>
        <title>User Settings | My App</title>
      </Helmet>
    <ContentBox>
      <Typography variant="h4" sx={{ color: '#C1C6DB', marginBottom: '30px' }}>
        List of users
      </Typography>
      <UsersList isProfile={false} />
    </ContentBox>
    </>
  );
};

export default UserSettings;
