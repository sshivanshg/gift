import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import PhotoGallery from './components/PhotoGallery';

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

// Confetti component
const Confetti: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  const confettiColors = ['#FF69B4', '#FF1493', '#FFD1DC', '#FFF0F5', '#FFB6C1'];
  const confettiPieces = Array.from({ length: 80 });
  return (
    <div className="confetti">
      {confettiPieces.map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            width: 10 + Math.random() * 8,
            height: 10 + Math.random() * 8,
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            borderRadius: '50%',
            opacity: 0.7 + Math.random() * 0.3,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `floatHeart 2.5s linear ${Math.random() * 2}s 1 forwards`,
          }}
        />
      ))}
    </div>
  );
};

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

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [giftRevealed, setGiftRevealed] = useState(false);
  const sections = [
    {
      title: "Happy Mother's Day!",
      content: "To the most amazing mom in the world...",
      color: "#FF69B4",
    },
    {
      title: "Thank You For Everything",
      content: "Your love, care, and support mean the world to me.",
      color: "#FF1493",
    },
    {
      title: "You're My Hero",
      content: "Every day, you inspire me to be better.",
      color: "#FF69B4",
    },
    {
      title: "Our Beautiful Memories",
      content: "Swipe through our special moments together...",
      color: "#FFD1DC",
      component: <PhotoGallery />,
    },
    {
      title: "A Special Surprise!",
      content: "Click below to reveal your gift!",
      color: "#FFD1DC",
    },
  ];

  useEffect(() => {
    if (currentSection === sections.length - 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [currentSection, sections.length]);

  const nextSection = () => {
    if (currentSection === sections.length - 1) return;
    setCurrentSection((prev) => (prev + 1) % sections.length);
    setGiftRevealed(false);
  };

  const handleGiftReveal = () => {
    setGiftRevealed(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #FFF0F5 30%, #FFE4E1 90%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <FloatingHearts />
        <Confetti show={showConfetti} />
        <Container maxWidth="md">
          <AnimatePresence mode="wait">
            <>
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: 4,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="bounce-heart">♥</div>
                  <Typography
                    variant="h2"
                    component={motion.h2}
                    sx={{
                      color: sections[currentSection].color,
                      marginBottom: 3,
                      fontWeight: 'bold',
                    }}
                  >
                    <AnimatedText text={sections[currentSection].title} />
                  </Typography>
                  <Typography
                    variant="h5"
                    component={motion.p}
                    sx={{
                      color: '#666',
                      marginBottom: 4,
                      lineHeight: 1.6,
                    }}
                  >
                    {sections[currentSection].content}
                  </Typography>
                  {sections[currentSection].component}
                  {currentSection === sections.length - 1 ? (
                    <GiftBox revealed={giftRevealed} onReveal={handleGiftReveal} />
                  ) : (
                    <Button
                      variant="contained"
                      onClick={nextSection}
                      className="pulse-button neon-glow"
                      sx={{
                        backgroundColor: sections[currentSection].color,
                        '&:hover': {
                          backgroundColor: sections[currentSection].color,
                          opacity: 0.9,
                        },
                        padding: '12px 30px',
                        borderRadius: '30px',
                        fontSize: '1.1rem',
                      }}
                    >
                      Next Message
                    </Button>
                  )}
                </Box>
              </motion.div>
            </>
          </AnimatePresence>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App; 