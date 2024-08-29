const fraudData = {
  "nodes": [
    {
      "id": "pessoa_1",
      "type": "pessoa",
      "name": "Alice Smith",
      "role": "Suspeita",
      "img_path": "/imgs/alice_smith.jpg"
    },
    {
      "id": "pessoa_2",
      "type": "pessoa",
      "name": "Bob Johnson",
      "role": "Testemunha",
      "img_path": "/imgs/bob_johnson.jpg"
    },
    {
      "id": "empresa_1",
      "type": "empresa",
      "name": "TechCorp",
      "role": "Empresa Envolvida",
      "img_path": "/imgs/techcorp.jpg"
    },
    {
      "id": "empresa_2",
      "type": "empresa",
      "name": "FinanceInc",
      "role": "Provedor de Serviços",
      "img_path": "/imgs/financeinc.jpg"
    },
    {
      "id": "pessoa_3",
      "type": "pessoa",
      "name": "Clara Adams",
      "role": "Contadora",
      "img_path": "/imgs/clara_adams.jpg"
    },
    {
      "id": "pessoa_4",
      "type": "pessoa",
      "name": "David Brown",
      "role": "Advogado",
      "img_path": "/imgs/david_brown.jpg"
    },
    {
      "id": "pessoa_5",
      "type": "pessoa",
      "name": "Carlos Silva",
      "role": "Gerente de Projetos",
      "img_path": "/imgs/carlos_silva.jpg"
    }
  ],
  "links": [
    {
      "source": "pessoa_1",
      "target": "empresa_1",
      "relationship": "Associada a",
      "value": 9
    },
    {
      "source": "pessoa_2",
      "target": "empresa_2",
      "relationship": "Contratada Por",
      "value": 5
    },
    {
      "source": "empresa_1",
      "target": "empresa_2",
      "relationship": "Transações Com",
      "value": 7
    },
    {
      "source": "pessoa_3",
      "target": "empresa_1",
      "relationship": "Responsável pelas Finanças de",
      "value": 7
    },
    {
      "source": "pessoa_4",
      "target": "pessoa_1",
      "relationship": "Representa",
      "value": 8
    },
    {
      "source": "pessoa_5",
      "target": "empresa_1",
      "relationship": "Gerencia Projetos em",
      "value": 6
    }
  ]
}



// Exportar o objeto atualizado
export default fraudData;
