import React from 'react';
import FloatingButtons from '../../components/Buttons/buttonsMenu';
import InfoCard from '../../components/InfoBoard';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <FloatingButtons/>
      <InfoCard/>

    </Container>
  );
};

export default Home;
