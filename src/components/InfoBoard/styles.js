import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 350px;
  background-color: #282A36;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const Title = styled.h3`
  font-size: 18px;
  color: white;
  font-weight: bold;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    color: #bd93f9;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-left: 20px; 
    width: 60px;
    height: 60px;
    align-items: center;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

export const MainText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const SubText = styled.span`
  color: #ffffff;
  font-family: 'Montserrat', sans-serif; /* Define a fonte Montserrat */
  font-weight: 400; /* Peso Regular da Fonte */
  font-size: 14px;
`;

export const LinkText = styled.a`
  font-size: 12px;
  color: #ffffff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  background-color: rgba(189, 147, 249, 0.33);
  height 5px;
  width: 350px;
  margin-rigth: 10px;
`;

export const RelationshipSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px; /* Espaço adicional acima da seção */
`;

export const RelationshipTitle = styled.h4`
  font-size: 14px;
  color: white;
  font-weight: bold;
`;

export const RelationshipContent = styled.div`
  font-size: 14px;
  color: white;
  a {
    color: #bd93f9;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AdvancedInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AdvancedTitle = styled.h4`
  font-size: 14px;
  color: white;
  font-weight: bold;
`;

export const AdvancedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InfoBlock = styled.div`
  background-color: #44475A;
  padding: 10px;
  border-radius: 5px;
`;

export const InfoHeader= styled.div`
  background-color: #44475A;
  padding: 10px;
  border-radius: 5px;
  margin-left: 30px;
`;

export const BlockTitle = styled.p`
  font-size: 12px;
  color: #FFFFFF;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const BlockText = styled.p`
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
`;

export const BlockSubText = styled.p`
  font-size: 12px;
  color: #FFFFFF;
  margin: 0;
`;
