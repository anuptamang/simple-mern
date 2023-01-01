import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { styled } from '@mui/material'

export const BtnLoading = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) => ({
    background: theme.palette.common.white,
    color: theme.palette.common.black,

    '&:hover': {
      background: theme.palette.grey[400],
      color: theme.palette.common.black,
    },

    '&:disabled': {
      background: theme.palette.grey[400],
      color: theme.palette.common.black,
    },
    '& .MuiCircularProgress-svg': {
      color: '#333',
    },
  })
)
