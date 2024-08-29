import React, { useState } from 'react';
import * as S from './styles'; 
import SearchIcon from '../assets/image/search.svg'; 
import PinIcon from '../assets/image/pin.svg'; 

const TransformCard = ({ resetClickNode }) => {
  const [pinnedButtons, setPinnedButtons] = useState([false, false, false, false]);

  const togglePin = (index) => {
    const newPinnedState = [...pinnedButtons];
    newPinnedState[index] = !newPinnedState[index];
    setPinnedButtons(newPinnedState);
  };

  return (
    <S.CardContainer>
      <S.Header>
        <S.Title>Aplicar Transformações</S.Title>
        <S.CloseButton onClick={resetClickNode}>&times;</S.CloseButton>
      </S.Header>
      <S.ContentSection>
        <S.SearchContainer>
          <S.SearchInput placeholder="Buscar transforms" />
          <S.SearchButton>
            <img src={SearchIcon} alt="Pesquisar" />
          </S.SearchButton>
        </S.SearchContainer>
        <S.CenteredContainer>
          <S.ButtonGroup>
            {['[OSINT] Busca empresa', '[OSINT] Busca de Propriedades', '[OSINT] Busca de Propriedades', '[OSINT] Busca de Propriedades'].map((text, index) => (
              <S.ButtonContainer key={index}>
                <S.PinIcon pinned={pinnedButtons[index]} onClick={() => togglePin(index)}>
                  <img src={PinIcon} alt="Fixar" />
                </S.PinIcon>
                <S.ActionButton pinned={pinnedButtons[index]}>
                  {text}
                </S.ActionButton>
              </S.ButtonContainer>
            ))}
          </S.ButtonGroup>
        </S.CenteredContainer>
      </S.ContentSection>
    </S.CardContainer>
  );
};

export default TransformCard;
