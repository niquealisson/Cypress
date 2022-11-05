/// <reference types="cypress" />

import { format, prepareLocalStorage } from '../support/utils'

context('Dev Finances', () => {

    beforeEach(() => {
        
        cy.visit('https://dev-finance.netlify.app', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        })

    });

    it('Cadastrar entradas', () => {

        cy.get('#transaction .button').click()
        cy.get('#description').type('Trabalho')
        cy.get('[name=amount]').type(455)
        cy.get('[type=date]').type('2022-10-24')
        cy.get('button').contains('Salvar').click()

        cy.get('#data-table tbody tr').should('have.length', 3)


    });

    it('CADASTRAR SAÍDAS', () => {
        
        cy.get('#transaction .button').click()
        cy.get('#description').type('conta de energia')
        cy.get('[name=amount]').type(-450)
        cy.get('[type=date]').type('2022-10-24')
        cy.get('button').contains('Salvar').click()

        cy.get('#data-table tbody tr').should('have.length', 3)
        
    });

    it('Remover entradas e saidas', () => {
        //INCERÇÃO DE ITEMK POR INTEM VIA INTERFAÇE//
        //const entrada = 'Total'
        //const saida = 'Conta de energia'
        
        //cy.get('#transaction .button').click()
        //cy.get('#description').type(entrada)
        //cy.get('[name=amount]').type(455)
        //cy.get('[type=date]').type('2022-10-24')
        //cy.get('button').contains('Salvar').click()

        //cy.get('#transaction .button').click()
        //cy.get('#description').type(saida)
        //cy.get('[name=amount]').type(-450)
        //cy.get('[type=date]').type('2022-10-24')
        //cy.get('button').contains('Salvar').click()


        cy.get('td.description')
          .contains("Total")
          .parent()
          .find('img[onclick*=remove]')
          .click()
        

        cy.get('td.description')
          .contains('Conta de energia')
          .siblings()
          .children('img[onclick*=remove]')
          .click() 

        cy.get('#data-table tbody tr').should('have.length', 0)
    });

    it('validar saldo com diversas transaçoes', () => {

        //INCERÇÃO DE ITEMK POR INTEM VIA INTERFAÇE//
        //const entrada = 'Total'
        //const saida = 'Conta de energia'
        
        //cy.get('#transaction .button').click()
        //cy.get('#description').type(entrada)
        //cy.get('[name=amount]').type(455)
        //cy.get('[type=date]').type('2022-10-24')
        //cy.get('button').contains('Salvar').click()

        //cy.get('#transaction .button').click()
        //cy.get('#description').type(saida)
        //cy.get('[name=amount]').type(-450)
        //cy.get('[type=date]').type('2022-10-24')
        //cy.get('button').contains('Salvar').click()
        

        //INCERÇÃO VIA LOGAL STORAGE//
        let incomes = 0
        let expenses = 0
        
        cy.get('#data-table tbody tr')
          .each(($el, index, $list) => {

            cy.get($el).find('td.income, td.expense').invoke('text').then(text =>{
                
                if(text.includes('-')){
                    expenses = expenses + format(text)
                }else{
                    incomes = incomes + format(text)
                }

                cy.log(`entradas`,incomes)
                cy.log(`saidas`,expenses)
        
            })
                
        })

        cy.get('#totalDisplay').invoke('text').then(text => {

            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)

        })

    });
});