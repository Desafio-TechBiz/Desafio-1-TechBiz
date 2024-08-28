import React from 'react';
import FloatingButtons from '../../components/Buttons/buttonsMenu';
import InfoCard from '../../components/InfoBoard';
import { useSelector } from 'react-redux';

import Graph3D from '../../components/Graph';
const Home = () => {
  const buttonsState = useSelector((state) => state.menu);

  const isSelected = () => {
    if(buttonsState.target){
      return 'suspects'
    }
    if(buttonsState.route){
      return 'paths'
    }

    return 'base'
  }

  return (
    <div>
      <FloatingButtons/>
      <Graph3D selected={isSelected()}/>
      {/* <InfoCard/> */}

      </div>
  );
};

export default Home;
