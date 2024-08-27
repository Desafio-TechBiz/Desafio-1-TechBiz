import React from 'react';
import { Typography, Container } from '@mui/material';
import Graph3D from '../../components/Graph';
const Home = () => {
  return (
    <div>
      {/* <Typography variant="h4" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="body1">
        This is a simple layout with a header.
      </Typography> */}
      <Graph3D/>
    </div>
  );
};

export default Home;
