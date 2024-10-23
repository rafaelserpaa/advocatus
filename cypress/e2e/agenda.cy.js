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

  it("Caso favoravel para adicionar compromisso", () => {
    cy.get(".agenda").click();
    cy.wait(1000); 
    cy.get(".flatpickr-day.today.selected").click();
    cy.wait(1000); 
    cy.get("#add-compromisso").click();
    cy.get("#hora_inicio.time-input").type("01:59");
    cy.get("#hora_fim.time-input").type("18:59");
    cy.get("#processo.text-input").type("processo 01");
    cy.get("#local.text-input").type(
      "Tribunal de Justiça de Pernambuco Palácio da Justiça - Praça da República, s/n - Santo Antônio, Recife / PE"
    );
    cy.get("#observacoes.observations-textarea").type(
      "chegar com 1 hora de antecedência."
    );
    cy.wait(1000);  
    cy.get(".submit-button").click();
    cy.wait(2000); 
  });

  it("Caso favoravel para gerenciar compromisso", () => {
    cy.get(".agenda").click();
    cy.wait(1000); 
    cy.get(".flatpickr-day.today.selected").click();
    cy.get("#add-compromisso").click();
    cy.get("#hora_inicio.time-input").type("02:00");
    cy.get("#hora_fim.time-input").type("18:00");
    cy.get("#processo.text-input").type("processo 02");
    cy.get("#local.text-input").type("Tribunal de Justiça de Minas Gerais");
    cy.get("#observacoes.observations-textarea").type(
      "chegar com 3 horas de antecedência."
    );
    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.get(".agenda").click();
    cy.wait(1000); 
    cy.get(".flatpickr-day.today.selected").click();
    cy.get(".edit-button").last().click();
    cy.wait(1000); 
    cy.get("#processo.text-input").should("have.value", "processo 02");
    cy.get("#processo.text-input").clear().type("processo 02 editado");
    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.get(".agenda").click();
    cy.wait(1000); 
    cy.get(".flatpickr-day.today.selected").click();
    cy.get(".commitment-item").should("exist");
    cy.get(".delete-button").last().click();
    cy.on("window:confirm", () => true);
    cy.wait(2000); 
  });

  it("Caso desfavoravel para adicionar compromisso", () => {
    cy.get(".agenda").click();
    cy.wait(1000); 
    cy.get(".flatpickr-day.today.selected").click();
    cy.get("#add-compromisso").click();

    cy.get("#hora_fim.time-input").type("18:59");
    cy.get("#local.text-input").type(
      "Tribunal de Justiça de Pernambuco Palácio da Justiça - Praça da República, s/n - Santo Antônio, Recife / PE"
    );
    cy.get("#observacoes.observations-textarea").type(
      "chegar com 1 hora de antecedência."
    );
    cy.wait(1000);  

    cy.get(".submit-button").click();
    cy.get("#processo.text-input:invalid").should("have.length", 1);
    cy.get("#hora_inicio.time-input:invalid").should("have.length", 1);
    cy.wait(2000); 
  });

  it("Caso desfavoravel para editar compromisso", () => {
    cy.get(".agenda").click();
    cy.wait(1000); 
    cy.get(".flatpickr-day.today.selected").click();
    cy.get("#add-compromisso").click();
    cy.get("#hora_inicio.time-input").type("02:00");
    cy.get("#hora_fim.time-input").type("18:00");
    cy.get("#processo.text-input").type("processo 02");
    cy.get("#local.text-input").type("Tribunal de Justiça de Minas Gerais");
    cy.get("#observacoes.observations-textarea").type(
      "chegar com 3 horas de antecedência."
    );
    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.get(".agenda").click();
    cy.wait(1000); 
    cy.get(".flatpickr-day.today.selected").click();
    cy.get(".edit-button").last().click();
    cy.get("#processo.text-input").clear();
    cy.get(".submit-button").click();
    cy.get("#processo.text-input:invalid").should("have.length", 1);
    cy.wait(2000); 
  });
});