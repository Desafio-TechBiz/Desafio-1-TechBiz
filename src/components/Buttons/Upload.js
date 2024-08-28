import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import colors from '../../styles/variables';
import FileUploadIcon from '@mui/icons-material/FileUpload';

// Estilo do botão
export const StyledButton = styled('div')(({ theme }) => ({
  color: colors.foreground,
  marginLeft: '20px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05)', // Aumenta um pouco o botão ao passar o mouse
  },
}));

const Upload = () => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <StyledButton onClick={handleClick}>
        <FileUploadIcon fontSize="medium" />
      </StyledButton>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Esconde o input de arquivo
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
