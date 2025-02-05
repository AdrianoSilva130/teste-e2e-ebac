/// <reference types="cypress" />
let dadosLogin

context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
        cy.login(dados.usuario, dados.senha , {log: false})
        })
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, adriano.teste')
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type('adriano.teste@teste.com.br')
        cy.get('#password').type('senha@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, adriano.teste')
    })
})