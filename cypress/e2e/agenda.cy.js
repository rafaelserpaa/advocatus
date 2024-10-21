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

  it("should prevent submission when required fields are missing", () => {
    cy.get(".agenda").click();
    cy.get(".flatpickr-day.today.selected").click();
    cy.get("#add-compromisso").click();

    // Não preencher campos obrigatórios (processo e hora de início)
    cy.get("#hora_fim.time-input").type("18:59");
    cy.get("#local.text-input").type(
      "Tribunal de Justiça de Pernambuco Palácio da Justiça - Praça da República, s/n - Santo Antônio, Recife / PE"
    );
    cy.get("#observacoes.observations-textarea").type(
      "chegar com 1 hora de antecedência."
    );

    // Tentar submeter o formulário sem os campos obrigatórios
    cy.get(".submit-button").click();

    // Verificar se o formulário não foi enviado (formulário ainda existe)
    cy.get("#processo.text-input:invalid").should("have.length", 1); // O campo "processo" está marcado como inválido
    cy.get("#hora_inicio.time-input:invalid").should("have.length", 1); // O campo "hora de início" está marcado como inválido
  });

  it("should prevent editing a commitment when required fields are missing", () => {
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

    // Passo 2: Tentar editar o compromisso sem preencher campos obrigatórios
    cy.get(".agenda").click();
    cy.get(".flatpickr-day.today.selected").click();
    cy.get(".edit-button").last().click(); // Seleciona o compromisso para edição
    cy.get("#processo.text-input").clear(); // Limpa o campo obrigatório do processo
    cy.get(".submit-button").click(); // Tenta submeter o formulário sem preencher o campo obrigatório

    // Verificar se o campo está marcado como inválido
    cy.get("#processo.text-input:invalid").should("have.length", 1); // Verifica que o campo do processo está inválido
  });

  it("should prevent saving the edited commitment if required fields are missing", () => {
    // Passo 1: Acessar a agenda e adicionar o compromisso para ser editado
    cy.get(".agenda").click();
    cy.get(".flatpickr-day.today.selected").click();
    cy.get("#add-compromisso").click();
    cy.get("#hora_inicio.time-input").type("10:00");
    cy.get("#hora_fim.time-input").type("12:00");
    cy.get("#processo.text-input").type("processo 03");
    cy.get("#local.text-input").type("Fórum de Recife");
    cy.get("#observacoes.observations-textarea").type("Reunião importante.");
    cy.get(".submit-button").click();

    // Passo 2: Acessar o compromisso criado para edição
    cy.get(".agenda").click();
    cy.get(".flatpickr-day.today.selected").click();
    cy.get(".edit-button").last().click(); // Seleciona o compromisso recém-criado para edição

    // Passo 3: Limpar um campo obrigatório (processo) e tentar salvar
    cy.get("#processo.text-input").clear(); // Limpa o campo obrigatório 'processo'

    // Verificar se o campo está marcado como inválido antes de tentar enviar o formulário
    cy.get("#processo.text-input")
      .invoke("prop", "validationMessage")
      .should("contain", "Preencha este campo"); // Verifica a mensagem nativa do navegador

    // Tentar clicar no botão de salvar e garantir que o formulário não foi submetido
    cy.get(".submit-button").click();

    // Verificar se o campo ainda está inválido e se a mensagem nativa de required está presente
    cy.get("#processo.text-input").then(($input) => {
      expect($input[0].checkValidity()).to.be.false; // Verifica se o campo continua inválido
      expect($input[0].validationMessage).to.eq("Preencha este campo."); // Verifica a mensagem de validação nativa
    });
  });
});
