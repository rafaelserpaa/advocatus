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

const addClient2 = () => {
  cy.visit("");
  cy.get(".cliente").click();
  cy.wait(1000); 

  cy.get(".add-client").click();
  cy.get("#name").type("test");
  cy.get("#cell").type("81995750922zcx");
  cy.get("#birthdate").type("2007-05-20");
  cy.get("#cpf").type("13382342234zxc");
  cy.get("#cep").type("12313234142");
  cy.get("#adress").type("Rua rui barbosa,833asdsa");
  cy.get("#states").select("Pernambuco");
  cy.get("#states").should("have.value", "PE");
  cy.get("#city").type("paulistaaasddasd");
  cy.get("#neighborhood").type("jangaasadasd");
  cy.get("#role").type("estudanteeasda");
  cy.get(".submit-button").click();
  cy.wait(2000); 
  cy.visit("");
};

const addClient3 = () => {
  cy.visit("");
  cy.get(".cliente").click();
  cy.wait(1000); 

  cy.get(".add-client").click();
  cy.get("#name").type("maria");
  cy.get("#cell").type("81991234567");
  cy.get("#birthdate").type("1990-12-15");
  cy.get("#cpf").type("11122233344");
  cy.get("#cep").type("50050-200");
  cy.get("#adress").type("Avenida Boa Viagem, 1234");
  cy.get("#states").select("Pernambuco");
  cy.get("#states").should("have.value", "PE");
  cy.get("#city").type("Recife");
  cy.get("#neighborhood").type("Boa Viagem");
  cy.get("#role").type("engenheira");
  cy.get(".submit-button").click();
  cy.wait(2000); 
  cy.visit("");
};

describe('processos e2e tests', () => {
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

  
  it("Caso favoravel para adicionar processo", () => {
    addClient1();
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

    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.get(".alert-success").should(
      "contain",
      "Processo cadastrado com sucesso!"
    );
    cy.get(".processes").click();
  });

  it("Caso favoravel para gerenicar processo", () => {
    addClient2();
    cy.get(".processes").click();
    cy.get(".add-process").click();
    cy.wait(1000); 
    cy.get("input[name='tipo']").type("Cível");
    cy.get("input[name='titulo']").type("Processo Teste");
    cy.get("input[name='tipo_acao']").type("Cobrança");
    cy.get("select[name='cliente']").select("test"); 
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

    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.get(".alert-success").should(
      "contain",
      "Processo cadastrado com sucesso!"
    );

    cy.get(".processes").click();
    cy.get(".edit-process").last().click();
    cy.wait(1000); 

    cy.get("input[name='titulo']").clear().type("Processo Editado");
    cy.get("input[name='tipo_acao']").clear().type("Execução");
    cy.get("input[name='valor_causa']").clear().type("20000");

    cy.get(".submit-button").click();
    cy.wait(2000); 

    cy.get(".alert-success").should(
      "contain",
      "Processo atualizado com sucesso!"
    );
    cy.get(".processes").click();
    cy.contains("Processo Editado").should("exist");

    cy.get(".processes").click();
    cy.get(".delete-process").last().click();
    cy.wait(2000); 

    cy.get(".alert-success").should(
      "contain",
      "Processo deletado com sucesso!"
    );
  });
it("Caso desfavoravel para adicionar processo", () => {
  addClient3(); 

  cy.get(".processes").click();
  cy.get(".add-process").click();
  cy.wait(1000); 

  cy.get("input[name='tipo']").type("Cível");
  cy.get("input[name='titulo']").clear();
  cy.get("input[name='tipo_acao']").type("Cobrança");
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

  cy.get(".submit-button").click();
  cy.wait(2000); 

});

it("Caso desfavoravel para gerenciar processo", () => {
  addClient3();
  cy.get(".processes").click();
  cy.get(".add-process").click();
  cy.wait(1000); 


  cy.get("input[name='tipo']").type("Cível");
  cy.get("input[name='titulo']").type("Processo Válido");
  cy.get("input[name='tipo_acao']").type("Cobrança");
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

  cy.get(".submit-button").click();
  cy.wait(2000); 

  cy.get(".processes").click();
  cy.get(".edit-process").last().click();
  cy.wait(1000); 

  cy.get("input[name='titulo']").clear();
  cy.get(".submit-button").click();
  cy.wait(2000); 

});
});