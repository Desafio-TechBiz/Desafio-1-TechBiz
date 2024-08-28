import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import colors from '../../styles/variables';

const ProjectNameInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  marginTop: '20px',
  marginBottom: '20px',
  backgroundColor: 'transparent',
  '& input': {
    textAlign: 'center',
    color: 'white',
    // fontWeight: 'bold',
    fontSize: '24px',
    transition: 'color 0.3s ease',
    '&:focus': {
      color: colors.foreground, // Cor do texto ao focar no input
    },
  },
  '& input::placeholder': {
    color: colors.foreground,
    textAlign: 'center',
  },
  '& .MuiInput-underline:before': {
    borderBottom: `2px solid transparent`, // Linha inferior invisível por padrão
    transition: 'border-color 0.3s ease',
  },
  '&:hover .MuiInput-underline:before': {
    borderBottom: `2px solid ${colors.currentLine}`, // Linha inferior ao passar o mouse
  },
  '& .MuiInput-underline:after': {
    borderBottom: `2px solid ${colors.foreground}`, // Linha inferior ao focar
  },
}));

const ProjectName = () => {
  const [projectName, setProjectName] = useState('');

  const handleChange = (event) => {
    setProjectName(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProjectNameInput
        value={projectName}
        onChange={handleChange}
        placeholder="Nome do projeto"
        variant="standard"
      />
    </div>
  );
};

export default ProjectName;
