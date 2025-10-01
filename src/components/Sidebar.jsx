import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: 'linear-gradient(180deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
    color: 'white',
    border: 'none',
    boxShadow: theme.shadows[8]
  }
}));

const LogoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3, 3),
  textAlign: 'center',
  background: 'rgba(255,255,255,0.05)',
  marginBottom: theme.spacing(2)
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  display: 'block',
  margin: theme.spacing(0.5, 1),
  borderRadius: '12px',
  overflow: 'hidden',

  '& .MuiListItemButton-root': {
    borderRadius: '12px',
    margin: 0,
    transition: 'all 0.3s ease',
    border: '1px solid transparent'
  },

  '&.active .MuiListItemButton-root': {
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    boxShadow: '0 4px 12px rgba(238, 90, 36, 0.3)',
    border: '1px solid rgba(255,255,255,0.2)'
  },

  '&:hover:not(.active) .MuiListItemButton-root': {
    background: 'rgba(255,255,255,0.08)',
    transform: 'translateX(4px)'
  }
}));

const menu = [
  { to: '/', label: 'Dashboard', icon: <HomeIcon /> },
  { to: '/members', label: 'Members', icon: <PeopleIcon /> },
  { to: '/accounts', label: 'Accounts', icon: <AccountBalanceIcon /> },
  { to: '/transaction', label: 'Transaction', icon: <SettingsIcon /> },
  {
    label: 'Loans',
    icon: <SavingsIcon />,
    children: [
      { to: '/loans', label: 'Loan Form' },
      { to: '/approvalloan', label: 'Loan Status' }
    ]
  },
  { to: '/reports', label: 'Reports', icon: <AssessmentIcon /> }
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <StyledDrawer variant="permanent">
      <LogoSection>
        <Box sx={{
          width: 60,
          height: 60,
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: '0 4px 12px rgba(238, 90, 36, 0.3)'
        }}>
          <AccountBalanceIcon sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          Society Bank
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
          Premium Banking Solutions
        </Typography>
      </LogoSection>

      <List sx={{ px: 1.5 }}>
        {menu.map((m) => (
          <React.Fragment key={m.to}>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              {m.children ? (
                <ListItemButton onClick={() => handleToggle(m.label)}>
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {m.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={m.label}
                    primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
                  />
                  {openMenus[m.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              ) : (
                <StyledNavLink to={m.to}>
                  {({ isActive }) => (
                    <ListItemButton>
                      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        {m.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={m.label}
                        primaryTypographyProps={{
                          fontSize: '0.95rem',
                          fontWeight: isActive ? 600 : 400
                        }}
                      />
                    </ListItemButton>
                  )}
                </StyledNavLink>
              )}
            </ListItem>

            {m.children && (
              <Collapse in={openMenus[m.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {m.children.map((child) => (
                    <ListItem key={child.to} disablePadding sx={{ pl: 4, mb: 0.5 }}>
                      <StyledNavLink to={child.to}>
                        {({ isActive }) => (
                          <ListItemButton>
                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{
                                fontSize: '0.85rem',
                                fontWeight: isActive ? 600 : 400
                              }}
                            />
                          </ListItemButton>
                        )}
                      </StyledNavLink>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 3, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.1)',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem'
        }}>
          <Box sx={{
            width: 8,
            height: 8,
            background: '#4caf50',
            borderRadius: '50%',
            mr: 1
          }} />
          System Online
        </Box>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.6 }}>
          v2.1 • Last sync: Today
        </Typography>
      </Box>
    </StyledDrawer>
  );
}