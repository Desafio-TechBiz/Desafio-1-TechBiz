import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import organization from "../assets/image/organization.svg";
import person from "../assets/image/person.svg";
import phone from "../assets/image/phone.svg";
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';

// Dados fictícios
const entities = [
  { id: 1, name: "Pessoa", value: "Pessoa", icon: person },
  { id: 2, name: "Empresa", value: "Empresa", icon: organization },
  { id: 3, name: "E-mail", value: "E-mail", icon: EmailIcon },
  { id: 4, name: "Web", value: "Web", icon: PublicIcon },
  { id: 5, name: "Telefone", value: "Telefone", icon: phone },
];

// Estilização do Container
const SearchContainer = styled('div')(({ theme }) => ({
  width: '100%',
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

  const handleSelect = (entity) => {
    setSearchTerm(entity.name);
    setFilteredEntities(entities); // Restaura a lista completa após a seleção
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      // Filtra entidades baseadas no valor de pesquisa
      const filtered = entities.filter((entity) =>
        entity.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEntities(filtered);
    } else {
      setFilteredEntities(entities); // Mostra todas as entidades quando a pesquisa está vazia
    }
  };

  return (
    <SearchContainer>
      <Title>Buscar entidade</Title>
      <SearchInput
        type="text"
        placeholder="Pesquisar Entidade"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <EntityList>
        {filteredEntities.map((entity) => (
          <EntityListItem key={entity.id} onClick={() => handleSelect(entity)}>
            {typeof entity.icon === 'string' ? (
              <img
                src={entity.icon}
                alt={entity.name}
                style={{ marginRight: "10px", width: "20px" }}
              />
            ) : (
              <entity.icon style={{ marginRight: "10px" }} />
            )}
            {entity.name}
          </EntityListItem>
        ))}
      </EntityList>
    </SearchContainer>
  );
};

export default EntitySearch;
