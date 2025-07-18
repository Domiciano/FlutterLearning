import React from 'react';
import Box from '@mui/material/Box';

const YouTubeEmbed = ({ videoId, title = "YouTube video" }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingBottom: '38%', // 16:9
        height: 0,
        marginLeft:10,
        marginRight:10,
        overflow: 'hidden',
        borderRadius: 10,
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
