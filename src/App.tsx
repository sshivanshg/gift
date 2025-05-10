import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Button } from '@mui/material';
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
  const hearts = Array.from({ length: 12 });
  return (
    <>
      {hearts.map((_, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            color: i % 2 === 0 ? '#FF69B4' : '#FFB6C1',
            fontSize: `${2 + Math.random() * 2}rem`,
          }}
        >
          ♥
        </span>
      ))}
    </>
  );
};

// Sparkle component for the gift reveal
const Sparkle: React.FC<{ x: number; y: number; key: number }> = ({ x, y, key }) => (
  <svg
    className="sparkle"
    style={{ left: x, top: y }}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    key={key}
  >
    <path
      d="M9 0L10.7553 6.24472L17 8.00001L10.7553 9.75529L9 16L7.24472 9.75529L1 8.00001L7.24472 6.24472L9 0Z"
      fill="#FF69B4"
    />
  </svg>
);

// Animated text component
const AnimatedText: React.FC<{ text: string }> = ({ text }) => (
  <span className="animated-text">
    {text.split('').map((char, i) => (
      <span
        key={i}
        style={{ animationDelay: `${i * 0.04 + 0.2}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

const GiftBox: React.FC<{ revealed: boolean; onReveal: () => void }> = ({ revealed, onReveal }) => {
  const [sparkles, setSparkles] = useState<{ x: number; y: number; key: number }[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!revealed && boxRef.current) {
      // Generate sparkles
      const rect = boxRef.current.getBoundingClientRect();
      const newSparkles = Array.from({ length: 18 }).map((_, i) => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        key: Date.now() + i,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 1200);
      onReveal();
    }
  };

  return (
    <div className="gift-box-container">
      <div
        className="gift-box"
        ref={boxRef}
        onClick={handleClick}
        style={{ cursor: revealed ? 'default' : 'pointer' }}
      >
        <div className={`gift-lid${revealed ? ' open' : ''}`}></div>
        <div className="gift-ribbon"></div>
        {sparkles.map((s) => (
          <Sparkle x={s.x} y={s.y} key={s.key} />
        ))}
      </div>
      {revealed && (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <span style={{ fontSize: '1.5rem', color: '#FF69B4', fontWeight: 700 }}>
            🎁 You get all my love, always! 🎁
          </span>
        </div>
      )}
      {!revealed && (
        <div style={{ marginTop: 12, color: '#888', fontSize: '1rem' }}>
          Click the box to open your surprise!
        </div>
      )}
    </div>
  );
};

const sections = [
  {
    title: "Happy Mother's Day!",
    content: "To the most amazing mother in the world...",
    color: "#FF69B4"
  },
  {
    title: "Our Beautiful Memories",
    content: "Swipe through our special moments together...",
    color: "#FF69B4",
    component: <PhotoGallery />
  }
];

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [giftRevealed, setGiftRevealed] = useState(false);

  const handleGiftReveal = () => {
    setGiftRevealed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #FFB6C1 30%, #FFC0CB 90%)',
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
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ 
                textAlign: 'center', 
                color: 'white',
                py: 4
              }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {sections[currentSection].title}
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {sections[currentSection].content}
                </Typography>

                {sections[currentSection].component}

                {currentSection < sections.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={() => setCurrentSection(prev => prev + 1)}
                    sx={{
                      mt: 4,
                      backgroundColor: 'white',
                      color: '#FF69B4',
                      px: 4,
                      py: 1.5,
                      borderRadius: '25px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#FFE4E1',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    Continue
                  </Button>
                )}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App; 