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
    it('Inclusão do cadastro', () => {
      cy.get(BOTAO_CADASTRAR_POKEMON).should('be.visible').click()

      cy.get(COD_POKEDEX).should('be.visible', 'be.enabled').type('10')
      cy.get(NOME).should('be.visible', 'be.enabled').type('Caterpie')
      cy.get(NIVEL).should('be.visible', 'be.enabled').type('21')
      cy.get(TIPO).should('be.visible', 'be.enabled').select('FOGO')
      cy.get(ATAQUE_BASICO).should('be.visible', 'be.enabled').type('Picada')
      cy.get(ATAQUE_CARREGADO).should('be.visible', 'be.enabled').type('Insistência')
      cy.get(OBSERVACOES).should('be.visible', 'be.enabled').type('Caterpie é um Pokémon larva verde com marcas amarelas em forma de anel para baixo dos lados de seu corpo. Sua característica mais notável é a brilhante antena vermelha em sua cabeça, a partir do qual ele libera um cheiro para repelir predadores.')

      cy.get(BOTAO_SALVAR).should('be.visible').click()
    })
  })
  
  context('Edição de pokémon', () => {
    it('Erro proposital na edição', () =>{
      
    })
  })
})