import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
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

const PhotoGallery: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
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
            textAlign: isMobile ? 'left' : 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}>
            <PhotoImage
              src={photo.src}
              alt={photo.caption}
              style={{ 
                maxHeight: isMobile ? '200px' : '300px', 
                width: 'auto',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            />
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                color: '#FF69B4', 
                fontWeight: 'bold',
                mb: 1
              }}
            >
              {photo.caption}
            </Typography>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              sx={{ 
                color: '#666',
                fontStyle: 'italic'
              }}
            >
              {photo.date}
            </Typography>
          </Box>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default PhotoGallery; 