const fraudData = {
  nodes: [
    {
      id: 1,
      type: "person",
      name: "John Doe",
      role: "Investigator",
    },
    {
      id: 2,
      type: "person",
      name: "Alice Smith",
      role: "Suspect",
    },
    {
      id: 3,
      type: "person",
      name: "Bob Johnson",
      role: "Witness",
    },
    {
      id: 4,
      type: "company",
      name: "TechCorp",
      role: "Company Involved",
    },
    {
      id: 5,
      type: "company",
      name: "FinanceInc",
      role: "Service Provider",
    },
  ],
  links: [
    {
      source: 1,
      target: 2,
      relationship: "Investigates",
      value: 8,
    },
    {
      source: 1,
      target: 3,
      relationship: "Interviews",
      value: 6,
    },
    {
      source: 2,
      target: 4,
      relationship: "Associated With",
      value: 9,
    },
    {
      source: 3,
      target: 5,
      relationship: "Hired By",
      value: 5,
    },
    {
      source: 4,
      target: 5,
      relationship: "Transactions With",
      value: 7,
    },
  ],
};

// Exportar o objeto atualizado
export default fraudData;
