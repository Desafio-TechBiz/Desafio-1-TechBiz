import React from 'react';
import FloatingButtons from '../../components/Buttons/buttonsMenu';
import InfoCard from '../../components/InfoBoard';
import TransformCard from '../../components/TransformBoard';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <FloatingButtons/>
      {/* <Typography variant="h4" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="body1">
        This is a simple layout with a header.
      </Typography> */}
      <InfoCard/>
      {/* <TransformCard/> */}

    </Container>
  );
};

export default Home;
