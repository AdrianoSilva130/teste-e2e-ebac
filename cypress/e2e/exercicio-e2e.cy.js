/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

  it('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
    cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[0].nomeProduto)
        produtosPage.addProdutoCarrinho(
            dados[0].tamanho, 
            dados[0].cor, 
            dados[0].quantidade)
            cy.get('#tab-title-description > a').should('contain' , 'Descrição')
            
        produtosPage.buscarProduto(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(
            dados[1].tamanho, 
            dados[1].cor, 
             dados[1].quantidade)
             cy.get('#tab-title-description > a').should('contain' , 'Descrição')
        
        produtosPage.buscarProduto(dados[2].nomeProduto)
        produtosPage.addProdutoCarrinho(
            dados[2].tamanho, 
            dados[2].cor, 
            dados[2].quantidade)
            cy.get('#tab-title-description > a').should('contain' , 'Descrição')

            produtosPage.buscarProduto(dados[3].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[3].tamanho, 
                dados[3].cor, 
                dados[3].quantidade)
                cy.get('#tab-title-description > a').should('contain' , 'Descrição')
        })
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_address_1').type(faker.location.streetAddress())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#billing_postcode').type('08210-350' , {log: false})
        cy.get('#billing_phone').type('11985898769' , {log: false})
        cy.get('#billing_email').type('adriano.teste@teste.com.br')
        cy.get('.wc_payment_method.payment_method_cod > label').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        
    });

});


