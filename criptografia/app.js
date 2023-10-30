const { create, getById } = require("./service");

// Criar uma entidade
async function createExample() {
  const entity = await create("documento-do-usuario", "token-do-cartao", 2000);
  console.log("Entidade criada:", entity);
}

// Buscar uma entidade por ID
async function getExample(id) {
  const entity = await getById(id);
  if (entity) {
    console.log("Entidade encontrada:", entity);
  } else {
    console.log("Entidade não encontrada.");
  }
}

// Chamar as funções de exemplo
createExample().then(() => getExample(6));
