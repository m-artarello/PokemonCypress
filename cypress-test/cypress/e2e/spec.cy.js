const BOTAO_CADASTRAR_POKEMON = '#btnCadastrarPokemon'
const BOTAO_SALVAR =  '.btn-success'
const SPAN_ERRO = 'form .text-danger'
const COD_POKEDEX = '#codPokedex'
const NOME = '#nome'
const NIVEL = '#nivel'
const TIPO = '#tipo'
const ATAQUE_BASICO = '#ataqueBasico'
const ATAQUE_CARREGADO = '#ataqueCarregado'
const OBSERVACOES = '#observacoes'
const TOAST = '#toast-3-title'
const BOTAO_EDITAR_POKEMON = '[name="btnEditarPokemon"]:first'
const CARD_POKEMON_TESTE = '[data-nome="Cypress"]'


describe('template spec', () => {
  beforeEach('passes', () => {
    cy.visit('http://localhost:5173')
  })

  context('Inclusão de pokemons', () => {
    it('Valida campos obrigatórios', () =>{
      cy.get(BOTAO_CADASTRAR_POKEMON).should('be.visible').click()
      cy.get(BOTAO_SALVAR).should('be.visible').click()

      cy.get(SPAN_ERRO).should('be.visible')
    })
    it('Inclusão de pokemon com sucesso', () => {
      cy.get(BOTAO_CADASTRAR_POKEMON).should('be.visible').click()

      cy.get(COD_POKEDEX).should('be.visible', 'be.enabled').type('10')
      cy.get(NOME).should('be.visible', 'be.enabled').type('Cypress')
      cy.get(NIVEL).should('be.visible', 'be.enabled').type('21')
      cy.get(TIPO).should('be.visible', 'be.enabled').select('FOGO')
      cy.get(ATAQUE_BASICO).should('be.visible', 'be.enabled').type('Picada')
      cy.get(ATAQUE_CARREGADO).should('be.visible', 'be.enabled').type('Insistência')
      cy.get(OBSERVACOES).should('be.visible', 'be.enabled').type('Caterpie é um Pokémon larva verde com marcas amarelas em forma de anel para baixo dos lados de seu corpo. Sua característica mais notável é a brilhante antena vermelha em sua cabeça, a partir do qual ele libera um cheiro para repelir predadores.')

      cy.get(BOTAO_SALVAR).should('be.visible').click()
    })
  })

  context('Listagem de pokemons', () => {
    it('Listagem do registro cadastrado no teste anterior', () =>{
      cy.get(CARD_POKEMON_TESTE).should('be.visible')
    })
  })
  
  context('Edição de pokemon', () => {
    it('Erro proposital na edição', () =>{
      cy.get(BOTAO_EDITAR_POKEMON).should('be.visible').click()

      cy.get(NOME).should('be.visible', 'be.enabled').clear().type('Er')
      cy.get(BOTAO_SALVAR).should('be.visible').click()

      cy.get(SPAN_ERRO).should('be.visible')
    })
  })
  
  context('Exclusão de pokemon', () => {
    it('Exclusão de pokemon com sucesso', () =>{
      cy.get(CARD_POKEMON_TESTE).should('be.visible')
        .within(() => {
          cy.get('[name="btnExcluirPokemon"]').should('be.visible').click();
        });
      
      cy.get(CARD_POKEMON_TESTE).should('not.exist')
    })
  })
  
})