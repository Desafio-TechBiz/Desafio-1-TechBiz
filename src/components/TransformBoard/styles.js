import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 350px;
  background-color: #6765A6; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px; 
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  z-index: 1000;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  position: relative; 
  margin-top: 10px; 
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-size: 18px;
  color: white;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif; 
  position: absolute; 
  left: 50%;
  transform: translateX(-50%); 
  white-space: nowrap; 
`;

export const CloseButton = styled.button`
  background: none;
  margin-left: 40px;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background-color: transparent; 
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; 
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background-color: #D9D9D9;
  border-radius: 5px;
  padding: 5px;
  height: 30px;
  width: 280px; 
  margin: 0 auto; 
  margin-bottom: 10px;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background-color: transparent;
  color: black; 
  font-size: 14px;
  font-family: 'Montserrat', sans-serif; 

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  background: none; 
  border: none;
  cursor: pointer;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: transparent; 
  }
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 10px; 
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 280px; 
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center; 
  gap: 10px; 
`;

export const ActionButton = styled.button`
  background-color: ${({ pinned }) => (pinned ? '#142142' : 'rgba(255, 255, 255, 0.1)')};
  color: ${({ pinned }) => (pinned ? '#F8F8F2' : 'white')};
  font-size: 14px;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif; 
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  flex-grow: 1; 
  display: flex;
  align-items: center; 

  &:hover {
    background-color: #8C8CBF; 
  }
`;

export const PinIcon = styled.div`
  width: 10px;
  height: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    filter: ${({ pinned }) => (pinned ? 'none' : 'invert(1)')}; 
  }

  &:hover {
    img {
      filter: invert(0.5); /* Efeito de hover para o pin */
    }
  }
`;
