/// <reference types="cypress" />

context('Dev Finances', () => {

    beforeEach(() => {
        
        cy.visit('https://dev-finance.netlify.app')
        cy.get('#data-table tbody tr').should('have.length', 0)

    });

    it('Cadastrar entradas', () => {

        cy.visit('https://dev-finance.netlify.app')
        cy.get('#data-table tbody tr').should('have.length', 0)

        cy.get('#transaction .button').click()
        cy.get('#description').type('Trabalho')
        cy.get('[name=amount]').type(455)
        cy.get('[type=date]').type('2022-10-24')
        cy.get('button').contains('Salvar').click()

        cy.get('#data-table tbody tr').should('have.length', 1)


    });

    it('CADASTRAR SAÍDAS', () => {
        
        cy.get('#transaction .button').click()
        cy.get('#description').type('conta de energia')
        cy.get('[name=amount]').type(-450)
        cy.get('[type=date]').type('2022-10-24')
        cy.get('button').contains('Salvar').click()

        cy.get('#data-table tbody tr').should('have.length', 1)
        
    });

    it('Remover entradas e saidas', () => {

        const entrada = 'Total'
        const saida = 'Conta de energia'
        
        cy.get('#transaction .button').click()
        cy.get('#description').type(entrada)
        cy.get('[name=amount]').type(455)
        cy.get('[type=date]').type('2022-10-24')
        cy.get('button').contains('Salvar').click()

        cy.get('#transaction .button').click()
        cy.get('#description').type(saida)
        cy.get('[name=amount]').type(-450)
        cy.get('[type=date]').type('2022-10-24')
        cy.get('button').contains('Salvar').click()


        cy.get('td.description')
          .contains(entrada)
          .parent()
          .find('img[onclick*=remove]')
          .click()
        

        cy.get('td.description')
          .contains(saida)
          .siblings()
          .children('img[onclick*=remove]')
          .click() 

        cy.get('#data-table tbody tr').should('have.length', 0)
    });

});