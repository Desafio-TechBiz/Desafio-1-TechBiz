import React from 'react';
import FloatingButtons from '../../components/Buttons/buttonsMenu';
import InfoCard from '../../components/InfoBoard';
import { Typography, Container } from '@mui/material';
import Graph3D from '../../components/Graph';
const Home = () => {
  return (
    <div>
      <FloatingButtons/>
      <Graph3D selected="paths"/>
      {/* <InfoCard/> */}

      </div>
  );
};

export default Home;
