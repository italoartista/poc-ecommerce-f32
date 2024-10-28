describe('RegistroUsuario E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/registro'); // Ajuste a URL conforme necessário
  });

  it('deve exibir mensagens de erro para campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();
    cy.get('div[role="alert"]').should('contain', 'Todos os campos são obrigatórios.');
  });

  it('deve exibir mensagem de erro para email inválido', () => {
    cy.get('#email').type('invalid-email');
    cy.get('#senha').type('123456');
    cy.get('#confirmacao-senha').type('123456');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-description').should('contain', 'Por favor, insira um email válido.');
  });

  it('deve exibir mensagem de erro para senhas que não coincidem', () => {
    cy.get('#email').type('test@example.com');
    cy.get('#senha').type('123456');
    cy.get('#confirmacao-senha').type('654321');
    cy.get('button[type="submit"]').click();
    cy.get('div[role="alert"]').should('contain', 'As senhas não coincidem.');
  });

  it('deve exibir mensagem de sucesso após registro bem-sucedido', () => {
    cy.get('#email').type('test@example.com');
    cy.get('#senha').type('123456');
    cy.get('#confirmacao-senha').type('123456');
    cy.get('button[type="submit"]').click();
    cy.get('div[role="alert"]').should('contain', 'Sua conta foi criada com sucesso!');
  });
});