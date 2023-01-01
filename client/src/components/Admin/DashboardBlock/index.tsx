import { Box, Grid } from '@mui/material'
import ContentBox from '../../UI/ContentBox'
import {
  LineCharts,
  BarCharts,
  RadarCharts,
  ComposedCharts,
  PieCharts,
} from './Stats'

const DashboardBlock = () => {
  return (
    <ContentBox>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={{ height: '300px' }}>
            <LineCharts />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={{ height: '300px' }}>
            <BarCharts />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={{ height: '300px' }}>
            <PieCharts />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={{ height: '400px' }}>
            <RadarCharts />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={8}>
          <Box sx={{ height: '400px' }}>
            <ComposedCharts />
          </Box>
        </Grid>
      </Grid>
    </ContentBox>
  )
}

export default DashboardBlock
