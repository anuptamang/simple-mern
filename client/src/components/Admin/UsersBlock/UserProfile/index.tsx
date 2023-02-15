import { Box, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PostsBlock from 'components/Admin/PostsBlock';
import FriendsList from 'components/FriendsList';
import TabPanel from 'components/UI/TabPanel';
import UserInfo from 'components/UserInfo';
import UsersList from 'features/UsersList';
import { SyntheticEvent, useState } from 'react';
import { a11yProps } from 'utils/a11yProps';

const tabContent = [
  {
    title: 'Profile',
    content: <UserInfo />,
  },
  {
    title: 'Followers',
    content: 'Coming Soon...',
  },
  {
    title: 'Friends',
    content: <FriendsList />,
  },
  {
    title: 'Posts',
    content: <PostsBlock />,
  },
  {
    title: 'Settings',
    content: <UsersList isProfile={false} />,
  },
];

const UserProfile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Profile
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="Profile"
          >
            {tabContent.map((tab: any, key: number) => (
              <Tab
                sx={{ color: '#fff', '&.Mui-selected': { color: '#fff' } }}
                key={key}
                label={tab.title}
                {...a11yProps(key)}
              />
            ))}
          </Tabs>
        </Box>
        {tabContent.map((tab: any, key: number) => (
          <TabPanel key={key} value={value} index={key}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default UserProfile;
