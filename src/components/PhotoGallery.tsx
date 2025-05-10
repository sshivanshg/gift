import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, IconButton, Typography, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const photos = [
  {
    src: '/photos/IMG_20210401_101446.jpg',
    caption: 'Our First Memory Together',
    date: 'April 1, 2021',
    filter: 'none'
  },
  {
    src: '/photos/IMG_20220706_105023.jpg',
    caption: 'A Special Day',
    date: 'July 6, 2022',
    filter: 'none'
  },
  {
    src: '/photos/IMG-20220707-WA0034.jpg',
    caption: 'Beautiful Moments',
    date: 'July 7, 2022',
    filter: 'none'
  },
  {
    src: '/photos/IMG-20220319-WA0019.jpg',
    caption: 'Cherished Memories',
    date: 'March 19, 2022',
    filter: 'none'
  },
  {
    src: '/photos/IMG_20230811_154252.jpg',
    caption: 'Latest Memory',
    date: 'August 11, 2023',
    filter: 'none'
  },
];

const GalleryContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  perspective: '1000px',
  touchAction: 'pan-y pinch-zoom',
  WebkitOverflowScrolling: 'touch',
}));

const PhotoCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '16px',
  overflow: 'hidden',
  cursor: 'pointer',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  '&:hover': {
    '& .photo-overlay': {
      opacity: 1,
    },
  },
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    borderRadius: '12px',
  },
}));

const PhotoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    opacity: 0.7,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
  },
}));

const PhotoImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const FilterButton = styled(ToggleButton)(({ theme }) => ({
  margin: '0 4px',
  borderRadius: '20px !important',
  border: '2px solid #FF69B4 !important',
  color: '#FF69B4',
  padding: '6px 12px',
  fontSize: '0.875rem',
  '&.Mui-selected': {
    backgroundColor: '#FF69B4',
    color: 'white',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px 8px',
    fontSize: '0.75rem',
    margin: '0 2px',
  },
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '20px 0',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: '2px',
    background: '#FF69B4',
    transform: 'translateX(-50%)',
    [theme.breakpoints.down('sm')]: {
      left: '20px',
    },
  },
}));

const TimelineItem = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  margin: '40px 0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '20px',
    height: '20px',
    background: '#FF69B4',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      left: '20px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
    paddingLeft: '50px',
  },
}));

const PhotoGallery: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | 'timeline'>('gallery');
  const [currentFilter, setCurrentFilter] = useState('none');
  const containerRef = useRef<HTMLDivElement>(null);

  const getFilterStyle = (filter: string) => {
    switch (filter) {
      case 'vintage':
        return 'sepia(0.5) contrast(1.2) brightness(0.9)';
      case 'warm':
        return 'saturate(1.5) brightness(1.1)';
      case 'cool':
        return 'hue-rotate(30deg) saturate(0.8)';
      case 'dramatic':
        return 'contrast(1.4) saturate(1.8)';
      default:
        return 'none';
    }
  };

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + photos.length) % photos.length);
  };

  const renderGallery = () => (
    <GalleryContainer ref={containerRef}>
      <AnimatePresence initial={false} mode="wait">
        <PhotoCard
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe > 10000) {
              paginate(offset.x > 0 ? -1 : 1);
            }
          }}
          onClick={() => setIsFullscreen(true)}
        >
          <PhotoImage
            src={photos[currentIndex].src}
            alt={`Photo ${currentIndex + 1}`}
            loading="lazy"
            style={{ filter: getFilterStyle(currentFilter) }}
          />
          <PhotoOverlay className="photo-overlay">
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                color="white" 
                sx={{ mb: 1, fontWeight: 'bold' }}
              >
                {photos[currentIndex].caption}
              </Typography>
              <Typography 
                variant={isMobile ? "body2" : "subtitle1"} 
                color="white"
              >
                {photos[currentIndex].date}
              </Typography>
            </Box>
          </PhotoOverlay>
        </PhotoCard>
      </AnimatePresence>

      <Box sx={{ 
        mt: 2, 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 1,
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#FF69B4',
          borderRadius: '4px',
        },
      }}>
        <ToggleButtonGroup
          value={currentFilter}
          exclusive
          onChange={(e, value) => value && setCurrentFilter(value)}
          aria-label="photo filter"
          size={isMobile ? "small" : "medium"}
        >
          <FilterButton value="none">Normal</FilterButton>
          <FilterButton value="vintage">Vintage</FilterButton>
          <FilterButton value="warm">Warm</FilterButton>
          <FilterButton value="cool">Cool</FilterButton>
          <FilterButton value="dramatic">Dramatic</FilterButton>
        </ToggleButtonGroup>
      </Box>

      {!isMobile && (
        <>
          <NavigationButton onClick={() => paginate(-1)} sx={{ left: 16 }}>
            ←
          </NavigationButton>
          <NavigationButton onClick={() => paginate(1)} sx={{ right: 16 }}>
            →
          </NavigationButton>
        </>
      )}
    </GalleryContainer>
  );

  const renderTimeline = () => (
    <TimelineContainer>
      {photos.map((photo, index) => (
        <TimelineItem
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Box sx={{ 
            width: isMobile ? '100%' : '80%', 
            textAlign: isMobile ? 'left' : 'center' 
          }}>
            <PhotoImage
              src={photo.src}
              alt={photo.caption}
              style={{ 
                maxHeight: isMobile ? '150px' : '200px', 
                width: 'auto',
                borderRadius: '8px',
              }}
            />
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              sx={{ mt: 1, color: '#FF69B4', fontWeight: 'bold' }}
            >
              {photo.caption}
            </Typography>
            <Typography 
              variant={isMobile ? "body2" : "subtitle1"} 
              sx={{ color: '#666' }}
            >
              {photo.date}
            </Typography>
          </Box>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2,
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#FF69B4',
          borderRadius: '4px',
        },
      }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, value) => value && setViewMode(value)}
          aria-label="view mode"
          size={isMobile ? "small" : "medium"}
        >
          <FilterButton value="gallery">Gallery</FilterButton>
          <FilterButton value="timeline">Timeline</FilterButton>
        </ToggleButtonGroup>
      </Box>

      {viewMode === 'gallery' && renderGallery()}
      {viewMode === 'timeline' && renderTimeline()}

      {isFullscreen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'none',
          }}
          onClick={() => setIsFullscreen(false)}
        >
          <motion.img
            src={photos[currentIndex].src}
            alt={`Fullscreen ${currentIndex + 1}`}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              filter: getFilterStyle(currentFilter),
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe > 10000) {
                paginate(offset.x > 0 ? -1 : 1);
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PhotoGallery; 