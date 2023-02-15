import UserProfile from 'components/Admin/UsersBlock/UserProfile';
import ContentBox from 'components/UI/ContentBox';
import { Helmet } from 'react-helmet';

const User = () => {
  return (
    <>
      <Helmet>
        <title>User Profile | My App</title>
      </Helmet>
      <ContentBox>
        {/* <UsersList isProfile={true} /> */}
        <UserProfile />
      </ContentBox>
    </>
  );
};

export default User;
