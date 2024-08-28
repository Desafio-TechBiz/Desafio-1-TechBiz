import React from "react";
import "./Graph3D.css"; // Adicione aqui seu CSS personalizado para estilizar o modal
import BaseGraph from "./BaseGraph";
import SuspectSelectGraph from "./SuspectSelectGraph";
import PathSelectGraph from "./PathSelectGraph";

const componentsDictionary = {
  base: BaseGraph,
  suspects: SuspectSelectGraph,
  paths: PathSelectGraph,
};

const Graph = ({ selected }) => {
  const SelectedGraph = componentsDictionary[selected];
  return (
    <div>
      <SelectedGraph />
    </div>
  );
};

export default Graph;
