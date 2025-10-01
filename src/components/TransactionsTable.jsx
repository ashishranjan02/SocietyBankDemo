import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: `1px solid ${theme.palette.divider}`
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  '& .MuiTableCell-root': {
    color: 'white',
    fontWeight: 600,
    border: 'none',
    fontSize: '0.9rem'
  }
}))

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: 600,
  borderRadius: '8px',
  ...(status === 'Completed' && {
    background: 'linear-gradient(135deg, #4caf50, #45a049)',
    color: 'white'
  }),
  ...(status === 'Pending' && {
    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
    color: 'white'
  }),
  ...(status === 'Failed' && {
    background: 'linear-gradient(135deg, #f44336, #d32f2f)',
    color: 'white'
  })
}))

const rows = [
  { id: 'TX001', date: '2025-09-20', member: 'Ravi Kumar', amount: '₹ 25,000', status: 'Completed', type: 'Deposit' },
  { id: 'TX002', date: '2025-09-19', member: 'Sita Menon', amount: '₹ 5,000', status: 'Pending', type: 'Withdrawal' },
  { id: 'TX003', date: '2025-09-18', member: 'Ajay Patel', amount: '₹ 12,500', status: 'Completed', type: 'Loan Payment' },
  { id: 'TX004', date: '2025-09-17', member: 'Meera Sharma', amount: '₹ 3,200', status: 'Failed', type: 'Transfer' },
  { id: 'TX005', date: '2025-09-16', member: 'Vikram Lal', amount: '₹ 8,500', status: 'Completed', type: 'Deposit' },
]

export default function TransactionsTable(){
  return (
    <StyledPaper>
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Recent Transactions
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Latest 5 transactions from your society
        </Typography>
      </Box>
      
      <TableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Member</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow 
                key={r.id}
                sx={{ 
                  '&:last-child td': { border: 0 },
                  '&:hover': { background: 'rgba(0,0,0,0.02)' }
                }}
              >
                <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{r.id}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{r.member}</TableCell>
                <TableCell>
                  <Chip 
                    label={r.type} 
                    size="small" 
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>{r.amount}</TableCell>
                <TableCell>
                  <StatusChip label={r.status} status={r.status} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 600, 
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          View All Transactions →
        </Typography>
      </Box>
    </StyledPaper>
  )
}