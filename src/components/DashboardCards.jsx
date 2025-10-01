import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

// Styled components for better visuals
const StyledCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: `linear-gradient(135deg, ${color?.main || '#667eea'}, ${color?.light || '#764ba2'})`,
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80px',
    height: '80px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    transform: 'translate(30px, -30px)'
  }
}))

const TrendIndicator = styled(Box)(({ trend }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.75rem',
  background: 'rgba(255,255,255,0.2)',
  padding: '4px 8px',
  borderRadius: '12px',
  marginTop: '8px'
}))

function Card({ title, value, subtitle, trend, trendValue, color }) {
  return (
    <StyledCard elevation={3} color={color}>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.9, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
          {subtitle}
        </Typography>
        {trend && (
          <TrendIndicator trend={trend}>
            {trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} /> : <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />}
            <span>{trendValue}</span>
          </TrendIndicator>
        )}
      </Box>
    </StyledCard>
  )
}

export default function DashboardCards() {
  const items = [
    { 
      title: 'Total Members', 
      value: '1,248', 
      subtitle: '+12% from last month', 
      trend: 'up', 
      trendValue: '12.3%',
      color: { main: '#667eea', light: '#764ba2' }
    },
    { 
      title: 'Active Loans', 
      value: '342', 
      subtitle: '₹ 8.2M total disbursed', 
      trend: 'up', 
      trendValue: '5.7%',
      color: { main: '#f093fb', light: '#f5576c' }
    },
    { 
      title: 'Total Savings', 
      value: '₹ 12.4M', 
      subtitle: 'Average ₹ 9,935 per member', 
      trend: 'up', 
      trendValue: '8.4%',
      color: { main: '#4facfe', light: '#00f2fe' }
    },
    { 
      title: 'Transactions', 
      value: '7,821', 
      subtitle: 'Successful in last 30 days', 
      trend: 'up', 
      trendValue: '15.2%',
      color: { main: '#43e97b', light: '#38f9d7' }
    },
  ]
  
  return (
    <Grid container spacing={3}>
      {items.map((it) => (
        <Grid item xs={12} sm={6} lg={3} key={it.title}>
          <Card {...it} />
        </Grid>
      ))}
    </Grid>
  )
}