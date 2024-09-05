import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import organization from "../assets/image/organization.svg";
import person from "../assets/image/person.svg";
import phone from "../assets/image/phone.svg";
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import * as S from './styles'; 
import ia from "../assets/image/ia.svg";
import { toggleButton } from '../../store/Slices/menuSlice.js';

import { useDispatch} from 'react-redux';


// Dados fictícios
const entities = [
  { id: 1, value: '[ARISP] Busca empresa' },
      { id: 2, value: '[CAGED] Busca de funcionários' },
      { id: 3, value: '[CNJ] Busca de Processos ' },
      { id: 4, value: '[Casa de Dados] Busca Registros' }
];

// Estilização do Container
const SearchContainer = styled('div')(({ theme }) => ({
  width: '25vw',
  padding: '15px',
  backgroundColor: '#6765A6',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}));

// Estilização do Título
const Title = styled('h3')(({ theme }) => ({
  fontFamily: 'Montserrat',
  fontWeight: 'normal',
  color: 'white',
  fontSize: '18px',
  margin: 0,
}));

// Estilização do Campo de Pesquisa
const SearchInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  fontSize: '16px',
  marginTop: '10px',
  outline: 'none',
  boxSizing: 'border-box',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}50`,
  },
}));

// Estilização da Lista de Entidades
const EntityList = styled("ul")(({ theme }) => ({
  listStyleType: "none",
  padding: "0",
  width: "100%",
  backgroundColor: "transparent",
  borderRadius: "8px",
  overflow: "hidden",
  maxHeight: "200px",
  overflowY: "auto",
  opacity: 1, // Mantém a lista visível
  transformOrigin: "top",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  zIndex: 10,
  marginTop: '5%'
}));

// Estilização dos Itens da Lista
const EntityListItem = styled("li")(({ theme }) => ({
  padding: "10px",
  cursor: "pointer",
  marginBottom: "4px",
  display: "flex",
  alignItems: "center", // Alinha o ícone com o texto
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
}));

const EntitySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntities, setFilteredEntities] = useState(entities);
  const dispatch = useDispatch();

  const handleSelect = (entity) => {
    dispatch(toggleButton('createTransform'));
    setSearchTerm(entity.value);
    setFilteredEntities(entities); // Restaura a lista completa após a seleção
  };


  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filtered = entities.filter((entity) => {
        const entityValue = entity.value.toLowerCase();
        let searchIndex = 0;

        for (let i = 0; i < entityValue.length; i++) {
          if (entityValue[i] === value[searchIndex]) {
            searchIndex++;
          }
          if (searchIndex === value.length) {
            return true;
          }
        }

        return false;
      });

      setFilteredEntities(filtered);
    } else {
      setFilteredEntities(entities); 
    }
  };

  return (
    <SearchContainer>
      <div style={{display: 'flex', alignItems: 'center',  width: '100%', marginLeft: '30%'}} >
      <Title>Aplicar Transformações</Title>
      <S.CloseButton onClick={() => localStorage.setItem('closeTransform', true)}>&times;</S.CloseButton>
      </div>  

      <SearchInput
        type="text"
        placeholder=""
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <EntityList>
        {filteredEntities.map((entity) => (
          <EntityListItem key={entity.id} onClick={() => handleSelect(entity)}>
              <img
              src={ia}
              alt="ia"
              style={{ marginRight: "5px", width: "20px", display: [1,2].includes(entity.id)? 'flex':'none' }}
            />
            {entity.value}
          </EntityListItem>
        ))}
      </EntityList>
    </SearchContainer>
  );
};

export default EntitySearch;
