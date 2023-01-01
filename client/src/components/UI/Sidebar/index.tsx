import React from 'react'
import { ChildrenProps } from '../../../types'
import { Grid } from '@mui/material'

const Sidebar = ({ children }: ChildrenProps) => {
  return (
    <Grid item xs={12} md={4} lg={3}>
      {children}
    </Grid>
  )
}

export default Sidebar
