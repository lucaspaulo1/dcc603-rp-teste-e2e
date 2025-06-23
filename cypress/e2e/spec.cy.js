describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca uma tarefa como completa e verifica estilo', () => {
    cy.visit('');
    
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para completar{enter}');
    
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();
    
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.class', 'completed');
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');
    
    cy.get('[data-cy=todo-input]')
      .type('Tarefa editável{enter}');
    
    cy.get('[data-cy=todos-list] > li label')
      .first()
      .dblclick();
    
    cy.get('[data-cy=todos-list] > li .edit')
      .first()
      .clear()
      .type('Tarefa modificada{enter}');
    
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('contain', 'Tarefa modificada');
  });

  it('Limpa todas as tarefas completas', () => {
    cy.visit('');
    
    // 1. Criar 3 tarefas (usando o mesmo padrão dos outros testes)
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
    
    // 2. Marcar as duas primeiras como completas (padronizado com outros testes)
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('[data-cy=toggle-todo-checkbox]')
      .click();
    
    cy.get('[data-cy=todos-list] > li')
      .eq(1)
      .find('[data-cy=toggle-todo-checkbox]')
      .click();
    
    // 3. Clicar no botão de limpar (Atenção: usando a classe real .clear-completed)
    cy.get('.clear-completed')
      .should('be.visible')
      .click();
    
    // 4. Verificar resultado (mesmo padrão dos outros asserts)
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa 3');
  });
});
