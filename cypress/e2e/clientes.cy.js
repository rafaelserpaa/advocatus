describe('clientes e2e tests', () => {
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
  it('should add a client successfully', () => {
    cy.visit("");
    cy.get(".cliente").click();
    cy.get(".add-client").click();
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
  });
  it('should edit and delete a client successfully', () => {
    cy.get(".cliente").click();
    cy.get(".submit-button").first().click();
    cy.get("input[name='name']").clear().type("Carlos Silva Editado");
    cy.get("input[name='number']").clear().type("81996543210");
    cy.get("input[name='birthdate']").clear().type("1990-10-10");
    cy.get(".submit-button").click();
    cy.get("a:contains('Deletar')").first().click();
  });
});