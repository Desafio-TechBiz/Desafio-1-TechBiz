import React from 'react';
import * as S from './styles'; 
import * as Icons from '../assets/image';

const InfoCard = () => {
  return (
    <S.CardContainer>
      <S.Header>
        <S.Title>Informações</S.Title>
        <S.CloseButton>&times;</S.CloseButton>
      </S.Header>
      <S.ContentSection>
        <S.SectionHeader>
          <S.IconContainer>
            <img src={Icons.OrganizationIcon} alt="Empresa" />
          </S.IconContainer>
          <S.InfoHeader>
            <S.TextContainer>
                <S.MainText>Website</S.MainText>
                <S.SubText>maltego.Website</S.SubText>
                <S.LinkText>www.yahoo.com.br</S.LinkText>
            </S.TextContainer>
          </S.InfoHeader>
        </S.SectionHeader>
        
        {/* <S.Divider> */}
          <S.RelationshipTitle>Relacionamento</S.RelationshipTitle>
        {/* </S.Divider> */}
        <S.RelationshipSection>
            <S.InfoBlock>
            <li>ddd</li>
            <a style={{color: 'white'}} href="http://yahoo.com.br">yahoo.com.br</a>
            </S.InfoBlock>
        </S.RelationshipSection>
        
          <S.AdvancedTitle>Informações Avançadas</S.AdvancedTitle>
        <S.AdvancedInfoSection>
          <S.AdvancedContent>
            <S.InfoBlock>
              <S.BlockTitle>Fonte da transformação</S.BlockTitle>
              <S.BlockText>yahoo.com.br</S.BlockText>
              <S.BlockSubText>To Website [Quick lookup]</S.BlockSubText>
              <S.BlockTitle>Data da geração</S.BlockTitle>
              <S.BlockText>25-08-2024 12:57:42</S.BlockText>
            </S.InfoBlock>
            {/* <S.InfoBlock>
              <S.BlockTitle>Data da geração</S.BlockTitle>
              <S.BlockText>25-08-2024 12:57:42</S.BlockText>
            </S.InfoBlock> */}
          </S.AdvancedContent>
        </S.AdvancedInfoSection>
      </S.ContentSection>
    </S.CardContainer>
  );
};

export default InfoCard;
