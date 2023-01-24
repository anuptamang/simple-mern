import ContentBox from 'components/UI/ContentBox';
import UsersList from 'features/UsersList';
import { Helmet } from 'react-helmet';

const User = () => {
  return (
    <>
      <Helmet>
        <title>User Profile | My App</title>
      </Helmet>
      <ContentBox>
        <UsersList isProfile={true} />
      </ContentBox>
    </>
  );
};

export default User;
