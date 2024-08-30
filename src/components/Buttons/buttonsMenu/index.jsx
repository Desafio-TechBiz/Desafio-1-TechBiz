import React from 'react';
import * as S from './styles';  
import * as Icons from '../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleButton } from '../../../store/Slices/menuSlice.js';


function generateInvestigationReport(data) {
  const { nodes, links } = data;

  // Inicializar o relatório
  let report = "Relatório de Investigação:\n";

  // Mapa para acessar informações dos nós pelo ID
  const nodesMap = new Map(nodes.map((node) => [node.id, node]));

  // Adicionar informações sobre os nós selecionados
  report +=
    "O caminho de investigação selecionado inclui os seguintes elementos:\n";
  nodes.forEach((node) => {

 
      report += `- ${node.name} (${node.role}): Tipo - ${node.type}\n`;

  });

    // Adicionar informações sobre as conexões entre os nós selecionados
    report += "\nConexões entre os elementos selecionados:\n";
    links.forEach((link) => {
        const { source, target, relationship } = link;

        const sourceNode = nodes.find(node => node.id == source)
        const targetNode = nodes.find(node => node.id == target)

        if (targetNode && sourceNode)
   
      {  report += `- ${sourceNode.name} possui vínculo de ${relationship} com ${targetNode.name}\n`;}

    });
  
    // Conclusão do relatório
    report += "\nConclusão:\n";
    report +=
      "Este caminho de investigação mostra uma série de conexões e interações entre os elementos selecionados, indicando possíveis relações de interesse para a investigação.\n";
    
      console.log(report);
    return report;
}
const FloatingButtons = ({setFilterPiso}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showRoute, setShowRoute] = React.useState(false);
  const [showDownload, setShowDownload] = React.useState(false);
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
    if (button === 'download-report') {
      const data = JSON.parse(localStorage.getItem('relatorio'))
      const fileContent = generateInvestigationReport(data)


    
      // Cria um blob com o conteúdo do arquivo
      const blob = new Blob([fileContent], { type: 'text/plain' });
  
      // Cria um link de download para o blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'relatorio.txt'; // Nome do arquivo que será salvo
      document.body.appendChild(link);
      
      // Clica no link para iniciar o download
      link.click();
  
      // Remove o link do DOM após o download
      document.body.removeChild(link);
    }
  };

  const handleFilterClick = (value) => {

    setFilterPiso(value)

  }
  return (
    <>
      <S.FloatingButtonContainer>
        <S.ButtonRow>
          <S.FloatingButton onClick={() => handleButtonClick('target')}>
            <img src={Icons.TargetIcon} alt="Target" />
          </S.FloatingButton>
          {showDownload && ( 
            <S.FloatingButtonTarget onClick={() => handleButtonClick('download')}>
              <img src={Icons.DownloadIcon} alt="Download" />
            </S.FloatingButtonTarget>
          )}
        </S.ButtonRow>
        <S.FloatingButton onClick={() => handleButtonClick('filter')}>
          <img src={Icons.FilterIcon} alt="Filter" />
        </S.FloatingButton>
        <S.FloatingButton onClick={() => handleButtonClick('route')}>
          <img src={Icons.RouteIcon} alt="Route" />
        </S.FloatingButton>
        <S.FloatingButton onClick={() => handleButtonClick('zoomIn')}>
          <img src={Icons.ZoomInIcon} alt="Zoom In" />
        </S.FloatingButton>
        <S.FloatingButton onClick={() => handleButtonClick('zoomOut')}>
          <img src={Icons.ZoomOutIcon} alt="Zoom Out" />
        </S.FloatingButton>
        <S.FloatingButton onClick={() => handleButtonClick('expand')}>
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
          {( 
            <S.FloatingButtonTarget onClick={() => handleButtonClick('download-report')}>
              <img src={Icons.DownloadIcon} alt="Download" />
            </S.FloatingButtonTarget>
          )}
        </S.SidebarRoute>
      )}
      {showMenu && (
        <S.SidebarMenu>
          <S.MenuItem 
            onClick={() => handleFilterClick(7.5)}
        > {/* Verifica se é o filtro ativo */}
            <span>Vinculo Muito Forte</span>
            <img src={Icons.PointIcon} alt="Point" />
          </S.MenuItem>
          <S.MenuItem 
            onClick={() => handleFilterClick(5.0)}
        > {/* Verifica se é o filtro ativo */}
            <span>Vinculo Forte</span>
            <img src={Icons.PointIcon} alt="Point" />
          </S.MenuItem>
          <S.MenuItem 
            onClick={() => handleFilterClick(2.5)}
          > {/* Verifica se é o filtro ativo */}
            <span>Vinculo Moderado</span>
            <img src={Icons.PointIcon} alt="Point" />
          </S.MenuItem>
          <S.MenuItem 
            onClick={() => handleFilterClick(0)}
          > {/* Verifica se é o filtro ativo */}
            <span>Vinculo Fraco</span>
            <img src={Icons.PointIcon} alt="Point" />
          </S.MenuItem>
        </S.SidebarMenu>
      )}
    </>
  );
};

export default FloatingButtons;
