import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Container, Stack, Typography } from '@mui/material'
import { IconHolder } from './styles'

type Props = {}

const SocialBlock = (props: Props) => {
  return (
    <Container>
      <Typography
        variant="h5"
        sx={{
          textTransform: 'uppercase',
          mb: '40px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        follow me
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconHolder href="https://twitter.com" target="_blank">
          <TwitterIcon />
        </IconHolder>
      </Stack>
    </Container>
  )
}

export default SocialBlock
