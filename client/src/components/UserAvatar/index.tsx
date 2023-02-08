import Avatar from '@mui/material/Avatar';

type UserNameProps = {
  userName: string;
};

const UserAvatar = ({ userName }: UserNameProps) => {
  return (
    <Avatar>{userName.split(' ')[0][0] + userName.split(' ')[1][0]}</Avatar>
  );
};

export default UserAvatar;
