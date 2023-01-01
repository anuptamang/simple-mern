import { Container, Grid } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <Container sx={{ py: '50px' }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={12} lg={3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            reprehenderit esse ab nemo nesciunt perferendis alias, molestias
            culpa est eligendi dolor quis, libero quidem non, vitae eveniet
            blanditiis saepe debitis.
          </Grid>
          <Grid item xs={12} lg={5}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            ducimus accusamus, expedita repellat harum enim est ipsam, porro
            corporis doloremque tenetur esse? Ex ipsa itaque libero obcaecati
            perspiciatis ratione sed!
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
