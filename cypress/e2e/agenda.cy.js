describe("agenda e2e tests", () => {
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

  it("should add a commitment successfully", () => {
    cy.get(".agenda").click();
    cy.get(".flatpickr-day.today.selected").click();
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
    cy.get(".submit-button").click();
  });

  it("should edit and delete a newly created commitment successfully", () => {
    // Passo 1: Acessar a agenda e adicionar o compromisso
    cy.get(".agenda").click();
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

    // Passo 2: Editar o compromisso recém-adicionado
    cy.get(".agenda").click();
    cy.get(".flatpickr-day.today.selected").click();
    cy.get(".edit-button").last().click(); // Seleciona o primeiro compromisso para edição
    cy.get("#processo.text-input").should("have.value", "processo 02"); // Verifica o valor do campo 'processo'
    cy.get("#processo.text-input").clear().type("processo 02 editado"); // Edita o campo do processo
    cy.get(".submit-button").click(); // Confirma a edição do compromisso

    // Passo 3: Excluir o compromisso editado
    cy.get(".agenda").click();
    cy.get(".flatpickr-day.today.selected").click(); // Seleciona novamente o dia
    cy.get(".commitment-item").should("exist"); // Verifica que o compromisso existe
    cy.get(".delete-button").last().click(); // Clica no botão de deletar o compromisso
    cy.on("window:confirm", () => true); // Confirma a exclusão (se houver um alerta)
    
  });
});
