// src/pages/Login.jsx
import React, { useState } from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment,
  IconButton,
  Fade,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { 
  AccountCircle, 
  Lock, 
  Visibility, 
  VisibilityOff,
  AccountBalance,
  Security
} from "@mui/icons-material";

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '300%',
    height: '300%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    animation: 'float 20s infinite linear',
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: 450,
  width: "100%",
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  zIndex: 2,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)',
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.9)',
    },
    '&.Mui-focused': {
      background: 'white',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#667eea',
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}));

const FeatureList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
  borderRadius: '16px',
  border: '1px solid rgba(102, 126, 234, 0.1)',
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  color: '#667eea',
}));

// Floating animation
const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  animation: 'float 6s ease-in-out infinite',
}));

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fixed credentials
  const fixedCredentials = {
    username: "admin",
    password: "admin123",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === fixedCredentials.username && password === fixedCredentials.password) {
      const credentials = { username, password };
      onLogin(credentials);
      navigate("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
    setIsLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const demoCredentials = () => {
    setUsername(fixedCredentials.username);
    setPassword(fixedCredentials.password);
  };

  return (
    <GradientBackground>
      {/* Floating background elements */}
      <FloatingElement sx={{ width: 100, height: 100, top: '10%', left: '10%', animationDelay: '0s' }} />
      <FloatingElement sx={{ width: 150, height: 150, top: '20%', right: '15%', animationDelay: '2s' }} />
      <FloatingElement sx={{ width: 80, height: 80, bottom: '15%', left: '20%', animationDelay: '4s' }} />
      
      <StyledPaper elevation={0}>
        <LogoContainer>
          <LogoIcon>
            <AccountBalance sx={{ fontSize: 32, color: 'white' }} />
          </LogoIcon>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Society Bank
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Admin Dashboard
            </Typography>
          </Box>
        </LogoContainer>

        <Typography variant="h5" sx={{ 
          mb: 1, 
          textAlign: 'center', 
          fontWeight: 600,
          color: 'text.primary'
        }}>
          Welcome Back
        </Typography>
        
        <Typography variant="body2" sx={{ 
          mb: 4, 
          textAlign: 'center', 
          color: 'text.secondary' 
        }}>
          Sign in to access your dashboard
        </Typography>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <StyledTextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: '#667eea' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: -3 }}
          />

          <Fade in={!!error}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
              {error}
            </Alert>
          </Fade>

          <SubmitButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </SubmitButton>

            </form>

        <FeatureList>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#667eea', mb: 1 }}>
            Secure Access Features:
          </Typography>
          <FeatureItem>
            <Security sx={{ fontSize: 18 }} />
            <Typography variant="body2">256-bit SSL Encryption</Typography>
          </FeatureItem>
          <FeatureItem>
            <AccountBalance sx={{ fontSize: 18 }} />
            <Typography variant="body2">Real-time Dashboard</Typography>
          </FeatureItem>
          <FeatureItem>
            <Lock sx={{ fontSize: 18 }} />
            <Typography variant="body2">Multi-factor Authentication Ready</Typography>
          </FeatureItem>
        </FeatureList>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            v2.1 • Secure Banking Platform
          </Typography>
        </Box>
      </StyledPaper>

      {/* Add keyframes for floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>
    </GradientBackground>
  );
}