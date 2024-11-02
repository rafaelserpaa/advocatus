describe('juiz e2e tests', () => {
  beforeEach(() => {
    cy.exec('del /f db.sqlite3');
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

  it("Caso Favorável para adicionar Juiz", () => {
    cy.get(".juiz").click();
    cy.wait(1000); 
    cy.get(".add-juiz").click();
    cy.get("#name").type("rafael");
    cy.get("#cell").type("81995750921");
    cy.get("#date").type("2024-11-01");
    cy.get("#date2").type("2024-11-20");
    cy.get("#states").select("Pernambuco");
    cy.get("#states").should("have.value", "PE");
    cy.get("#city").type("Recife");
    cy.get(".submit-button").click();
    cy.wait(2000); 
    cy.visit("");
  });

  it("Caso Favorável para gerenciar Juiz", () => {
    cy.get(".juiz").click();
    cy.get(".add-juiz").click();
    cy.wait(1000); 
    cy.get("#name").type("Adrian Michael");
    cy.get("#cell").type("81971208080");
    cy.get("#date").type("2024-11-01");
    cy.get("#date2").type("2024-11-30");
    cy.get("#states").select("Pernambuco");
    cy.get("#states").should("have.value", "PE");
    cy.get("#city").type("Recife");
    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.get(".juiz").click();
    cy.get(".submit-button").first().click(); 
    cy.get("input[name='name']").clear().type("Adrian Michael Editado");
    cy.get("input[name='date']").type("2024-11-01");
    cy.get("input[name='date2']").type("2024-11-20");
    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.contains("Adrian Michael Editado").should("exist");

    cy.get(".juiz").click();
    cy.get("a:contains('Deletar')").first().click();
    cy.on("window:confirm", () => true); 
    cy.wait(2000); 
    cy.contains("Adrian Michael Editado").should("not.exist");
  });

  it("Caso Desfavorável para adicionar Juiz", () => {
    cy.get(".juiz").click();
    cy.wait(1000); 
    cy.get(".add-juiz").click();
    cy.get("#name").type("William");
    cy.get("#cell").type("81995750921");
    cy.get("#date").type("2024-11-01");
    cy.get("#date2").type("2024-12-10");
    cy.get("#states").select("Pernambuco");
    cy.get("#states").should("have.value", "PE");
    cy.get(".submit-button").click();
    cy.wait(2000); 
    cy.visit("");
  });

  it("Caso Desfavorável para Editar Juiz", () => {
    cy.get(".juiz").click();
    cy.get(".add-juiz").click();
    cy.wait(1000); 
    cy.get("#name").type("Carlos");
    cy.get("#cell").type("81998765432");
    cy.get("#date").type("2024-11-01");
    cy.get("#date2").type("2024-12-30");
    cy.get("#states").select("Pernambuco");
    cy.get("#states").should("have.value", "PE");
    cy.get("#city").type("Recife");
    cy.get(".submit-button").click();
    cy.wait(2000);

    cy.get(".juiz").click();
    cy.get(".submit-button").first().click(); 
    cy.get("input[name='name']").clear()
    cy.get(".submit-button").click();
    cy.wait(2000); 
  });
});
