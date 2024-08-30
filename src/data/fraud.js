const fraudData = {
  "nodes": [
    {
      "id": 0,
      "type": "pessoa",
      "name": "Alice Smith",
      "role": "Suspeita",
      "img_path": "/imgs/alice_smith.jpg"
    },
    {
      "id": 1,
      "type": "pessoa",
      "name": "Bob Johnson",
      "role": "Testemunha",
      "img_path": "/imgs/bob_johnson.jpg"
    },
    {
      "id": 2,
      "type": "empresa",
      "name": "TechCorp",
      "role": "Empresa Envolvida",
      "img_path": "/imgs/techcorp.jpg"
    },
    {
      "id": 3,
      "type": "empresa",
      "name": "FinanceInc",
      "role": "Provedor de Serviços",
      "img_path": "/imgs/financeinc.jpg"
    },
    {
      "id": 4,
      "type": "pessoa",
      "name": "Clara Adams",
      "role": "Contadora",
      "img_path": "/imgs/clara_adams.jpg"
    },
    {
      "id": 5,
      "type": "pessoa",
      "name": "David Brown",
      "role": "Advogado",
      "img_path": "/imgs/david_brown.jpg"
    },
    {
      "id": 6,
      "type": "pessoa",
      "name": "Carlos Silva",
      "role": "Gerente de Projetos",
      "img_path": "/imgs/carlos_silva.jpg"
    }
  ],
  "links": [
    {
      "source": 0,
      "target": 2,
      "relationship": "Associada a",
      "value": 9
    },
    {
      "source": 1,
      "target": 3,
      "relationship": "Contratada Por",
      "value": 5
    },
    {
      "source": 2,
      "target": 3,
      "relationship": "Transações Com",
      "value": 7
    },
    {
      "source": 4,
      "target": 2,
      "relationship": "Responsável pelas Finanças de",
      "value": 7
    },
    {
      "source": 5,
      "target": 0,
      "relationship": "Representa",
      "value": 8
    },
    {
      "source": 6,
      "target": 2,
      "relationship": "Gerencia Projetos em",
      "value": 6
    }
  ]
}



// Exportar o objeto atualizado
export default fraudData;
