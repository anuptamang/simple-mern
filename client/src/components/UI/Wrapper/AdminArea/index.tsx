import React from 'react'
import { ChildrenProps } from '../../../../types'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'

const AdminArea = ({ children }: ChildrenProps) => {
  return (
    <Container sx={{ py: '50px' }}>
      <Grid container spacing={4}>
        {children}
      </Grid>
    </Container>
  )
}

export default AdminArea
