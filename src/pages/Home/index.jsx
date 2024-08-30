import React, { useState } from 'react';
import FloatingButtons from '../../components/Buttons/buttonsMenu';
import InfoCard from '../../components/InfoBoard';
import TransformCard from '../../components/TransformBoard';
import { useSelector } from 'react-redux';

import Graph3D from '../../components/Graph';
const Home = () => {
  const buttonsState = useSelector((state) => state.menu);
  const [filterPiso, setFilterPiso] = useState(7.5);

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
      <FloatingButtons setFilterPiso={setFilterPiso}/>
      <Graph3D selected={isSelected()} nodeMode={'img'} filterPiso={filterPiso}/>
      {/* <InfoCard/> */}
      {/* <TransformCard/> */}
      </div>
  );
};

export default Home;
