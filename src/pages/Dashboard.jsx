import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import DashboardCards from '../components/DashboardCards'
import TransactionsTable from '../components/TransactionsTable'

export default function Dashboard(){
  return (
    <>
      <Typography variant="h5" sx={{ mb:2 }}>Welcome back, Admin</Typography>
      <DashboardCards />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Paper sx={{ p:2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Recent Transactions</Typography>
            <TransactionsTable />
          </Paper>
        </Grid>
        
      </Grid>
    </>
  )
}
