describe('agenda', () => {
  beforeEach(() => {
      cy.visit('/'); // Visita a página inicial antes de cada teste
  });

  it('Cadastro com sucesso', () => {
      cy.get('.register').click();
      cy.get('#username').type('rafael');
      cy.get('#email').type('rafaelserpa01@gmail.com');
      cy.get('#password').type('123');
      cy.get('#password2').type('123');
      cy.get('.btnbtn-primary').click();
      // Verifica se a mensagem de sucesso é exibida
  });

  it('Adicionar compromisso e editar compromisso', () => {
      cy.visit('login/');
      cy.get('#username').type('rafael');
      cy.get('#password').type('123');
      cy.get('.btnbtn-primary').click();
      cy.visit('');
      cy.get('.agenda').click();
      cy.get('.flatpickr-day.today.selected').click();
      cy.get('#add-compromisso').click();
      cy.get('#hora_inicio.time-input').type('01:59'); 
      cy.get('#hora_fim.time-input').type('18:59'); 
      cy.get('#processo.text-input').type('processo 01'); 
      cy.get('#local.text-input').type('Tribunal de Justiça de Pernambuco Palácio da Justiça - Praça da República, s/n - Santo Antônio, Recife / PE'); 
      cy.get('#observacoes.observations-textarea').type('chegar com 1 hora de antecedência.'); 
      cy.get('.submit-button').click();
      cy.get('.flatpickr-day.today.selected').click();
      cy.get('.edit-button').first().click();
      cy.get('#processo.text-input').should('have.value', 'processo 01'); 
      cy.get('#processo.text-input').clear(); 
      cy.get('#processo.text-input').type('processo 01 editado');
      cy.get('.submit-button').click();
  });

  it('Excluir compromisso', () => {
    cy.visit('login/');
    cy.get('#username').type('rafael');
    cy.get('#password').type('123');
    cy.get('.btnbtn-primary').click();
    cy.visit('');
    cy.get('.agenda').click();
    cy.get('.flatpickr-day.today.selected').click();
    cy.get('.commitment-item').should('exist'); 
    cy.get('.delete-button').first().click();
    cy.on('window:confirm', () => true);
    cy.get('.commitment-item').should('not.exist'); 
});

});
