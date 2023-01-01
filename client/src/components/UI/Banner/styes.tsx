import { Box, styled } from '@mui/material'

export const BannerBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',

  [theme.breakpoints.up('lg')]: {
    height: '600px',
  },
}))
