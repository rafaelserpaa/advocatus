describe("Clientes - E2E Tests", () => {
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

  it("Caso Favorável para adicionar cliente", () => {
    cy.get(".cliente").click();
    cy.get(".add-client").click();
    cy.wait(1000); 
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
    cy.wait(2000); 
    cy.visit(""); 
  });

  it("Caso Favorável para gerenciar cliente", () => {
    cy.get(".cliente").click();
    cy.get(".add-client").click();
    cy.wait(1000); 
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
    cy.wait(2000); 

    cy.get(".cliente").click();
    cy.get(".submit-button").first().click(); 
    cy.get("input[name='name']").clear().type("Carlos Silva Editado");
    cy.get("input[name='birthdate']").type("1990-10-10");
    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.contains("Carlos Silva Editado").should("exist");

    cy.get(".cliente").click();
    cy.get("a:contains('Deletar')").first().click();
    cy.on("window:confirm", () => true); 
    cy.wait(2000); 
    cy.contains("Carlos Silva Editado").should("not.exist");
  });

  it("Caso Desfavorável para Edição Clientes", () => {
    cy.get(".cliente").click();
    cy.get(".edit-client").first().click(); 

    cy.get("input[name='name']").clear();
    cy.get(".submit-button").click();

    cy.get("input[name='name']").then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

  it("Caso Desfavorável para Adição de Cliente", () => {
    cy.get(".cliente").click();
    cy.get(".add-client").click();

    cy.get(".submit-button").click();

    cy.get("#name").then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });

    cy.get("#cell").then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });
});
