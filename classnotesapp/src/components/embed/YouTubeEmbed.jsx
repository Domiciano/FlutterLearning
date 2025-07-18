import React from 'react';
import Box from '@mui/material/Box';

const YouTubeEmbed = ({ videoId, title = "YouTube video" }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingBottom: {lg:'38%', xs:'48%'}, // 16:9
        height: 0,
        marginLeft:0,
        marginRight:0,
        overflow: 'hidden',
        borderRadius: 4,
        boxShadow: 3,
        my: 3,
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?vq=hd1080&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default YouTubeEmbed;
