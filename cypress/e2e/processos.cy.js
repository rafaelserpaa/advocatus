
const addClient = () => {
  cy.visit("");
  cy.get(".cliente").click();
  
  cy.get(".add-client").click();
  cy.get("#name").type("rafael");
  cy.get("#cell").type("81995750921");
  cy.get("#birthdate").type("2007-05-22");
  cy.get("#cpf").type("13387878451");
  cy.get("#cep").type("53439-360");
  cy.get("#adress").type("Rua rui barbosa,832");
  cy.get("#states").select("Pernambuco");
  cy.get("#states").should("have.value", "PE");
  cy.get("#city").type("paulista");
  cy.get("#neighborhood").type("janga");
  cy.get("#role").type("estudante");
  cy.get(".submit-button").click();
  cy.visit("");
};

describe('processos e2e tests', () => {
  before(() => {
    cy.visit("");
    cy.get(".register").click();
    cy.get("#username").type("test");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("123");
    cy.get("#password2").type("123");
    cy.get(".btnbtn-primary").click();
  })

  beforeEach(() => {
    cy.visit("/");
    cy.visit("login/");
    cy.get("#username").type("test");
    cy.get("#password").type("123");
    cy.get(".btnbtn-primary").click();
    cy.visit("");
  });

  it("should register a new process", () => {
    addClient()
    cy.get(".processes").click();
    cy.get(".add-process").click();
    cy.get("input[name='tipo']").type("Cível");
    cy.get("input[name='titulo']").type("Processo Teste");
    cy.get("input[name='tipo_acao']").type("Cobrança");
    cy.get("select[name='cliente']").select("rafael"); // Selecionar cliente existente
    cy.get("input[name='contrario']").type("Parte Contrária");
    cy.get("input[name='numero_pasta']").type("12345");
    cy.get("input[name='numero_cnj']").type("54321");
    cy.get("input[name='detalhes_pasta']").type("Detalhes do processo");
    cy.get("input[name='advogado']").type("Advogado Teste");
    cy.get("input[name='push_andamentos']").type("Sim");
    cy.get("input[name='comarca']").type("Comarca Teste");
    cy.get("input[name='juiz']").type("Juiz Teste");
    cy.get("select[name='risco']").select("Baixo");
    cy.get("input[name='tribunal']").type("Tribunal Teste");
    cy.get("select[name='uf']").select("SP");
    cy.get("select[name='instancia']").select("Primeira Instância");
    cy.get("input[name='vara']").type("Vara Teste");
    cy.get("input[name='valor_causa']").type("10000");
    cy.get("input[name='valor_possivel']").type("15000");
    cy.get("input[name='valor_provisionado']").type("12000");

    // Submeter o formulário
    cy.get(".submit-button").click();

    // Verificar a mensagem de sucesso
    cy.get(".alert-success").should(
      "contain",
      "Processo cadastrado com sucesso!"
    );

    cy.get(".processes").click();
  });

  it("should edit an existing process and delete a process", () => {
    // Acessar a lista de processos
    cy.get(".processes").click();

    // Selecionar o processo para editar
    cy.get(".edit-process").first().should("be.visible").click();

    // Editar os dados do processo
    cy.get("input[name='titulo']").clear().type("Processo Editado");
    cy.get("input[name='tipo_acao']").clear().type("Execução");
    cy.get("input[name='valor_causa']").clear().type("20000");

    // Submeter o formulário de edição
    cy.get(".submit-button").click();

    // Verificar a mensagem de sucesso da edição
    cy.get(".alert-success").should(
      "contain",
      "Processo atualizado com sucesso!"
    );

    // Verificar se o título foi atualizado
    cy.get(".processes").click();
    cy.contains("Processo Editado").should("exist");

    cy.get(".processes").click(); // Navegar para a página de processos

    // Supondo que haja um botão de deletar no primeiro processo listado
    cy.get(".delete-process").first().should("be.visible").click();

    // Verificar se a mensagem de sucesso foi exibida
    cy.get(".alert-success").should(
      "contain",
      "Processo deletado com sucesso!"
    );
  });

})