import { Box, Typography } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { getUserName } from 'utils/getUsername';

const leftStyles = {
  background: '#65976a',
  borderRadius: '20px',
  padding: '10px',
  maxWidth: '75%',
  marginBottom: '0',
  marginRight: '20px',
  color: '#fff',
  float: 'right',
};

const rightStyles = {
  background: '#236bae',
  borderRadius: '20px',
  padding: '10px',
  maxWidth: '75%',
  marginBottom: '0',
  marginLeft: '15px',
  color: '#fff',
  float: 'left',
};

type Props = {
  user: any;
  message: any;
  className: any;
};

const Messages = ({ user, message, className }: Props) => {
  const auth = useAuth();

  if (user) {
    return (
      <Box sx={{ overflow: 'hidden' }}>
        <Box>
          {user.toUpperCase() === 'ADMIN' ? (
            <Typography
              sx={{
                marginBottom: '20px',
                textAlign: 'center',
                fontStyle: 'italic',
                color: '#ddf959',
              }}
            >
              {message}
            </Typography>
          ) : (
            <>
              <Box sx={{ overflow: 'hidden' }}>
                <Box
                  className={className}
                  sx={{
                    '&.left': {
                      ...leftStyles,
                    },

                    '&.right': {
                      ...rightStyles,
                    },
                  }}
                >
                  {message}
                </Box>
              </Box>
              <Typography
                sx={{
                  textAlign: 'right',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                }}
              >
                {getUserName(user)}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <>
        <Box sx={{ overflow: 'hidden' }}>
          <Box
            className={className}
            sx={{
              '&.left': {
                ...leftStyles,
              },

              '&.right': {
                ...rightStyles,
              },
            }}
          >
            {message}
          </Box>
        </Box>
        <Typography
          sx={{
            textAlign: 'left',
            fontSize: '12px',
            textTransform: 'capitalize',
          }}
        >
          {auth?.result?.email && getUserName(auth.result.email)}
        </Typography>
      </>
    );
  }
};

export default Messages;
