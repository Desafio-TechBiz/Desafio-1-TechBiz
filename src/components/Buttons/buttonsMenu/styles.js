import styled from 'styled-components';

export const FloatingButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 5px;
`;

export const FloatingButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #282A36;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444444;
  }

  &:focus {
    outline: none;
  }

  img {
    width: 30px;
    height: 30px;
  }

`;

export const FloatingButtonTarget = styled(FloatingButton)`
  background-color: #44475A;
`;

export const SidebarMenu = styled.div`
  position: fixed;
  left: 60px;
  top: 52%;
  transform: translateY(-50%);
//   background-color: #282A36;
background-color:rgba(0,  0,  0,  0);
  width: 300px;
  padding: 15px;
  border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 1000;
`;

export const SidebarRoute = styled.div`
  position: fixed;
  left: 60px;
  top: 49%;
  transform: translateY(-50%);
//   background-color: #282A36;
background-color:rgba(0,  0,  0,  0);
  width: 300px;
  padding: 15px;
  border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 1000;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #282A36;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;

  img {
    //margin-left: auto; 
    margin-right: 10px; 
    width: 20px;
    height: 20px;
    align-items: center;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  color: white;
  flex-grow: 1;
  padding: 5px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #282A36;
  border-radius: 5px;
  //margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Inter', sans-serif; 
  font-weight: 400; 
  color: white; 

  &:hover {
    background-color: #444444;
  }

  img {
    margin-right: 10px; 
    width: 20px;
    height: 20px;
    align-items: center;
  }

  span img {
    width: 10px; 
    height: 10px;
  }
`;


