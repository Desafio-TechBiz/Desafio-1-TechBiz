import React, { useState } from 'react';
import * as S from './styles';  
import * as Icons from '../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleButton } from '../../../store/Slices/menuSlice.js';

const FloatingButtons = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showRoute, setShowRoute] = React.useState(false);
  const [showDownload, setShowDownload] = React.useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const dispatch = useDispatch();

  const handleButtonClick = (button) => {
    dispatch(toggleButton(button));

    if (button === 'filter') {
      setShowMenu(!showMenu);
      if (showRoute) setShowRoute(false); 
    }
    if (button === 'route'){
      setShowRoute(!showRoute);
      if (showMenu) setShowMenu(false); 
    }
    if (button === 'target') {
      setShowDownload(!showDownload); 
    }

    setActiveButton(activeButton === button ? null : button);
  };

  return (
    <>
      <S.FloatingButtonContainer>
        <S.ButtonRow>
          <S.FloatingButton 
            onClick={() => handleButtonClick('target')} 
            isActive={activeButton === 'target'}>
            <img src={Icons.TargetIcon} alt="Target" />
          </S.FloatingButton>
          {showDownload && ( 
            <S.FloatingButtonTarget 
            onClick={() => handleButtonClick('download')}
            isActive={activeButton === 'download'}>
              <img src={Icons.DownloadIcon} alt="Download" />
            </S.FloatingButtonTarget>
          )}
        </S.ButtonRow>
        <S.FloatingButton 
        onClick={() => handleButtonClick('filter')}
        isActive={activeButton === 'filter'}>
          <img src={Icons.FilterIcon} alt="Filter" />
        </S.FloatingButton>
        <S.FloatingButton 
        onClick={() => handleButtonClick('route')}
        isActive={activeButton === 'route'}>
          <img src={Icons.RouteIcon} alt="Route" />
        </S.FloatingButton>
        <S.FloatingButton 
        onClick={() => handleButtonClick('expand')}
        isActive={activeButton === 'expand'}>
          <img src={Icons.ExpandIcon} alt="Expand" />
        </S.FloatingButton>
      </S.FloatingButtonContainer>

      {showMenu && (
        <S.SidebarMenu>
          <S.SearchBarContainer>
            <S.SearchInput placeholder="Pesquisar entidade..." />
            <img src={Icons.SearchIcon} alt="Pesquisar" />
          </S.SearchBarContainer>
          <S.MenuItem>
            <span>
                <img src={Icons.PointIcon} alt="Point" />
                Pessoa Física
            </span>
            <img src={Icons.PersonIcon} alt="Pessoa Física" />
          </S.MenuItem>
          <S.MenuItem>
            <span>
                <img src={Icons.PointIcon} alt="Point" />
                Sócio
            </span>
            <img src={Icons.PersonIcon} alt="Sócio" />
          </S.MenuItem>
          <S.MenuItem>
            <span>
                <img src={Icons.PointInIcon} alt="PointIn" />
                Empresa
            </span>
            <img src={Icons.OrganizationIcon} alt="Empresa" />
          </S.MenuItem>
          <S.MenuItem>
            <span>
                <img src={Icons.PointIcon} alt="Point" />
                Local
            </span>
            <img src={Icons.LocationIcon} alt="Local" />
          </S.MenuItem>
          <S.MenuItem>
            <span>
                <img src={Icons.PointIcon} alt="Point" />
                Telefone
            </span>
            <img src={Icons.PhoneIcon} alt="Telefone" />
          </S.MenuItem>
        </S.SidebarMenu>
      )}

      {showRoute && (
        <S.SidebarRoute>
          <S.MenuItem>
            <img src={Icons.AddIcon} alt="Criar caminho" />
            <span>Criar caminho</span> 
          </S.MenuItem>
          <S.MenuItem>
            <img src={Icons.StarIcon} alt="Sugestão de caminhos" />
            Sugestão de caminhos
          </S.MenuItem>
        </S.SidebarRoute>
      )}
    </>
  );
};

export default FloatingButtons;
