import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import PhotoGallery from './components/PhotoGallery';
import Confetti from 'react-confetti';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4',
    },
    secondary: {
      main: '#FF1493',
    },
    background: {
      default: '#FFF0F5',
    },
  },
  typography: {
    fontFamily: '"Dancing Script", cursive, "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Floating hearts background
const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 30 });
  return (
    <>
      {hearts.map((_, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            color: i % 2 === 0 ? '#FFB6C1' : '#FFC0CB',
            fontSize: `${1.5 + Math.random() * 1.5}rem`,
            opacity: 0.7,
          }}
        >
          ♥
        </span>
      ))}
    </>
  );
};

const sections = [
  {
    title: "Our Beautiful Memories",
    content: "A timeline of our special moments together...",
    color: "#FF69B4",
    component: <PhotoGallery />
  },
  {
    title: "From All Of Us",
    content: "",
    color: "#FF69B4",
    component: (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        alignItems: 'center'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#FF69B4',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3
          }}
        >
          From:
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#FF69B4',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2
          }}
        >
          Nanu
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#FF69B4',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2
          }}
        >
          Aadu
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#FF69B4',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2
          }}
        >
          Arnav
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#FF69B4',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Shivu
        </Typography>
      </Box>
    )
  }
];

const App: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  setTimeout(() => setShowConfetti(false), 5000);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #FFE4E1 30%, #FFF0F5 90%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <FloatingHearts />
        {showConfetti && <Confetti />}
        <Container maxWidth="md">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ 
                textAlign: 'center', 
                color: '#FF69B4',
                py: 4
              }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    mb: 4,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(255,105,180,0.2)'
                  }}
                >
                  Happy Mother's Day!
                </Typography>

                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <Box sx={{ 
                      mb: 6,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 8px rgba(255,105,180,0.1)'
                    }}>
                      {section.component ? (
                        section.component
                      ) : (
                        <Typography 
                          variant="h4" 
                          component="h2" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: '#FF69B4',
                            textAlign: 'center'
                          }}
                        >
                          {section.title}
                        </Typography>
                      )}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App; 