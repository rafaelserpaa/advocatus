describe("Gerenciamento de Clientes - E2E Tests", () => {
  before(() => {
    cy.visit("/");
    cy.get(".register").click();
    cy.get("#username").type("rafael");
    cy.get("#email").type("rafaelserpa01@gmail.com");
    cy.get("#password").type("123");
    cy.get("#password2").type("123");
    cy.get(".btnbtn-primary").click();
  });

  beforeEach(() => {
    cy.visit("login/");
    cy.get("#username").type("rafael");
    cy.get("#password").type("123");
    cy.get(".btnbtn-primary").click();
    cy.visit("");
  });

  it("should add a client successfully", () => {
    cy.get(".cliente").click();
    cy.get(".add-client").click();
    cy.get("#name").type("rafael");
    cy.get("#cell").type("81995750921");
    cy.get("#birthdate").type("2007-05-22");
    cy.get("#cpf").type("13387878451");
    cy.get("#cep").type("53439-360");
    cy.get("#adress").type("Rua Rui Barbosa, 832");
    cy.get("#states").select("Pernambuco");
    cy.get("#city").type("Paulista");
    cy.get("#neighborhood").type("Janga");
    cy.get("#role").type("Estudante");
    cy.get(".submit-button").click();
    cy.visit(""); // Volta para a página inicial
  });

  it("Cenário Favorável para Edição - deve editar um cliente com sucesso", () => {
    cy.get(".cliente").click();
    cy.get(".add-client").click();

    // Adicionando um cliente para testar a edição
    cy.get("#name").type("Carlos Silva");
    cy.get("#cell").type("81998765432");
    cy.get("#birthdate").type("1990-10-10");
    cy.get("#cpf").type("12345678909");
    cy.get("#cep").type("12345-678");
    cy.get("#adress").type("Rua da Paz, 123");
    cy.get("#states").select("São Paulo");
    cy.get("#city").type("São Paulo");
    cy.get("#neighborhood").type("Centro");
    cy.get("#role").type("Desenvolvedor");
    cy.get(".submit-button").click();

    // Editando o cliente
    cy.get(".cliente").click();
    cy.get(".submit-button").first().click(); // Clica no botão de editar
    cy.get("input[name='name']").clear().type("Carlos Silva Editado");
    cy.get("input[name='birthdate']").type("1990-10-10");
    cy.get(".submit-button").click();

    // Verifica se a edição foi bem-sucedida
    cy.contains("Carlos Silva Editado").should("exist");
  });

  it("Cenário Desfavorável para Edição - deve exibir erro ao tentar editar sem preencher todos os campos obrigatórios", () => {
    cy.get(".cliente").click();
    cy.get(".submit-button").first().click(); // Clica no botão de editar
    cy.get(".submit-button").click();

    // Verifica se a mensagem de erro é exibida
    cy.get("input[name='birthdate']").then(($input) => {
      expect($input[0].checkValidity()).to.be.false; // Verifica se o campo continua inválido
      expect($input[0].validationMessage).to.eq("Preencha este campo."); // Verifica a mensagem de validação nativa
    });
  });

  it("Cenário Desfavorável para Adição - deve exibir erro ao tentar adicionar cliente sem preencher campos obrigatórios", () => {
    cy.get(".cliente").click();
    cy.get(".add-client").click();

    // Tenta submeter o formulário sem preencher campos obrigatórios
    cy.get(".submit-button").click();

    // Verifica se as mensagens de erro são exibidas
    cy.get("#name").then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.eq("Preencha este campo.");
    });

    cy.get("#cell").then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.eq("Preencha este campo.");
    });

    // Adicione mais verificações conforme necessário para outros campos obrigatórios
  });

  it("Cenário Favorável para Exclusão - deve excluir um cliente com sucesso", () => {
    cy.get(".cliente").click();
    cy.get(".add-client").click();

    // Adicionando um cliente para testar a exclusão
    cy.get("#name").type("Carlos Silva");
    cy.get("#cell").type("81998765432");
    cy.get("#birthdate").type("1990-10-10");
    cy.get("#cpf").type("12345678909");
    cy.get("#cep").type("12345-678");
    cy.get("#adress").type("Rua da Paz, 123");
    cy.get("#states").select("São Paulo");
    cy.get("#city").type("São Paulo");
    cy.get("#neighborhood").type("Centro");
    cy.get("#role").type("Desenvolvedor");
    cy.get(".submit-button").click();

    // Excluindo o cliente
    cy.get(".cliente").click();
    cy.get("a:contains('Deletar')").first().click();
    cy.on("window:confirm", () => true); // Confirma a exclusão
    // Verifica que o cliente foi excluído
    cy.contains("Carlos Silva").should("not.exist");
  });
});
