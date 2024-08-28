import React from 'react';
import FloatingButtons from '../../components/Buttons/buttonsMenu';
import InfoCard from '../../components/InfoBoard';
import { Typography, Container } from '@mui/material';
import Graph3D from '../../components/Graph';
const Home = () => {
  return (
    <Container>
      <FloatingButtons/>
      <Graph3D selected="suspects"/>
      <InfoCard/>

      </Container>
  );
};

export default Home;
