import React, { useState } from "react";
import "./Graph3D.css"; // Adicione aqui seu CSS personalizado para estilizar o modal
import BaseGraph from "./BaseGraph";
import SuspectSelectGraph from "./SuspectSelectGraph";
import PathSelectGraph from "./PathSelectGraph";

const componentsDictionary = {
  base: BaseGraph,
  suspects: SuspectSelectGraph,
  paths: PathSelectGraph,
};

const Graph = ({ selected, filterPiso }) => {

  const SelectedGraph = componentsDictionary[selected];
  return (
    <div style={{maxHeight: '100vh', maxWidth: '100vw'}}>
      <SelectedGraph nodeMode={'basic'} filterPiso={filterPiso}/>
    </div>
  );
};

export default Graph;
