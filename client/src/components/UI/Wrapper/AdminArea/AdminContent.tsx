import React from 'react'
import { ChildrenProps } from '../../../../types'
import { Grid } from '@mui/material'

const AdminContent = ({ children }: ChildrenProps) => {
  return (
    <Grid item xs={12} md={8} lg={9}>
      {children}
    </Grid>
  )
}

export default AdminContent
