const addClient1 = () => {
  cy.visit("");
  cy.get(".cliente").click();
  cy.wait(1000); 

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
  cy.wait(2000); 
  cy.visit("");
};

const addProcess = () => {
  cy.get(".processes").click();
  cy.get(".add-process").click();
  cy.wait(1000); 

  cy.get("input[name='tipo']").type("Cível");
  cy.get("input[name='titulo']").type("Processo Teste");
  cy.get("input[name='tipo_acao']").type("Cobrança");
  cy.get("select[name='cliente']").select("rafael"); 
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

  cy.get(".submit-button").click({ multiple: true });
  cy.wait(2000); 
  cy.get(".alert-success").should("contain", "Processo cadastrado com sucesso!");
};

describe("Agenda e2e tests", () => {
  beforeEach(() => {
    cy.exec('rm -f db.sqlite3')
    cy.exec('python manage.py migrate');
    cy.visit("/");
    cy.get(".register").click();
    cy.get("#username").type("rafael");
    cy.get("#email").type("rafaelserpa01@gmail.com");
    cy.get("#password").type("123");
    cy.get("#password2").type("123");
    cy.get(".btnbtn-primary").click();
    cy.wait(2000);
    cy.visit("login/");
    cy.get("#username").type("rafael");
    cy.get("#password").type("123");
    cy.get(".btnbtn-primary").click();
    cy.visit("");
    cy.wait(2000); 
  });

  it("Caso favorável para adicionar despesa", () => {
    addClient1();
    addProcess();
    cy.get(".financeiro").click();
    cy.get("#toggle-form").click();
    cy.get("select[name='process_title']").select("Processo Teste");
    cy.get("textarea[name='description']").type("Custos");
    cy.get("input[name='amount']").type("500.00");
    cy.get("input[name='expense_date']").type("2023-10-10");
    cy.get("select[name='expense_type']").select("judicial_fee").should("have.value", "judicial_fee");
    cy.wait(2000);
    cy.get("#btn-save").click();
    cy.get(".expense-table").should("contain", "Custas processuais");
    cy.get(".alert-success").should("contain", "Despesa cadastrada com sucesso!");
  });

  it("Caso desfavorável para adicionar despesa", () => {
    cy.get(".financeiro").click();
    cy.get("#toggle-form").click();
    cy.get("textarea[name='description']").type("Descrição inválida");
    cy.get("input[name='amount']").type("-100");
    cy.get("button[type='submit']").click();
    cy.get(".form-container .error").should("exist");
  });

  it("Editar e excluir uma despesa", () => {
    addClient1();
    addProcess();
    addExpense("Processo Teste", "Honorários advocatícios", "800.00", "2023-05-15", "attorney_fee");
    cy.get(".expense-table").should("contain", "Honorários advocatícios");

    cy.get(".expense-table .button-svg").first().click();
    cy.get("textarea[name='description']").clear().type("Descrição Editada");
    cy.get("button[type='submit']").click();
    cy.get(".alert-success").should("contain", "Despesa atualizada com sucesso!");

    cy.get(".expense-table .button-svg").last().click();
    cy.get(".alert-success").should("contain", "Despesa excluída com sucesso!");
  });
});
