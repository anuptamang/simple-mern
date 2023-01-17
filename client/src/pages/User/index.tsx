import ContentBox from 'components/UI/ContentBox';
import UsersList from 'features/UsersList';

const User = () => {
  return (
    <ContentBox>
      <UsersList isProfile={true} />
    </ContentBox>
  );
};

export default User;
