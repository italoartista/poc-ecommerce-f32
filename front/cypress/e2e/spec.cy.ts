describe('especificacao da tela de registro de usuario', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/registro')
  });

it('deve exibir mensagens de erro para campos vazios', () => {
    cy.get('button[type="submit"]').click();
    cy.get('div[role="alert"]').should('contain', 'Todos os campos são obrigatórios.');
});

it('deve exibir mensagem de erro para email invalido', () => {
    cy.get('input[name="email"]').type('email-invalido');
    cy.get('button[type="submit"]').click();
    cy.get('div[role="alert"]').should('contain', 'Por favor, insira um email válido.');
});
  
  it('deve exibir mensagem de erro para senha muito curta', () => {
      cy.get('#email').type('test@example.com');
      cy.get('#senha').type('123');
      cy.get('#confirmacao-senha').type('123');
      cy.get('button[type="submit"]').click();
      cy.get('div[role="alert"]').should('contain', 'A senha deve ter pelo menos 6 caracteres.');
    });

  it('deve exibir mensagem de erro para senhas diferentes', () => {
      cy.get('#email').type('test@example.com');
      cy.get('#senha').type('123456');
      cy.get('#confirmacao-senha').type('1234567');
      cy.get('button[type="submit"]').click();
      cy.get('div[role="alert"]').should('contain', 'As senhas não coincidem.');
    });

  it('deve exibir mensagem de sucesso ao registrar', () => {
      cy.get('#email').type('test@example.com');
      cy.get('#senha').type('123456');
      cy.get('#confirmacao-senha').type('123456');
      cy.get('button[type="submit"]').click();
      cy.get('div[role="alert"]').should('contain', 'Sua conta foi criada com sucesso.');
  });
})


