describe('clientes', () => {
  it('Cadastro com sucesso', () => {
    cy.visit('/');
    cy.get('.register').click();
    cy.get('#username').type('rafael');
    cy.get('#email').type('rafaelserpa01@gmail.com');
    cy.get('#password').type('123');
    cy.get('#password2').type('123');
    cy.get('.btnbtn-primary').click();
  })
  it('Adicionar clientes', () => {
    cy.visit('login/');
    cy.get('#username').type('rafael');
    cy.get('#password').type('123');
    cy.get('.btnbtn-primary').click();
    cy.visit('');
    cy.get('.cliente').click();
    cy.get('.add-client').click();
    cy.get('#name').type('rafael');
    cy.get('#cell').type('81995750921');
    cy.get('#birthdate').type('2007-05-22')
    cy.get('#cpf').type('13387878451');
    cy.get('#cep').type('53439-360');
    cy.get('#adress').type('Rua rui barbosa,832');
    cy.get('#states')
      .select('Pernambuco');
    cy.get('#states').should('have.value', 'PE');
    cy.get('#city').type('paulista');
    cy.get('#neighborhood').type('janga');
    cy.get('#role').type('estudante');
    cy.get('.submit-button').click();
  })
 


})