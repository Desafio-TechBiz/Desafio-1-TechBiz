import React from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import color from '../../styles/variables'

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: color.background,
  marginLeft: '20px',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(248, 248, 242, 0.90)',
    transform: 'scale(1.05)', // Aumenta um pouco o botão ao passar o mouse
  },
}));
const NewInvestigationButton = () => {
  return (
    <StyledButton
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
    >
      Nova Investigação
    </StyledButton>
  );
};

export default NewInvestigationButton;
