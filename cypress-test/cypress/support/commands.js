Cypress.Commands.add('excluirRegistro', (pokemonNome) => {
    const CARD_POKEMON_TESTE = `[data-nome="${pokemonNome}"]`

    cy.get(CARD_POKEMON_TESTE).should('be.visible')
        .within(() => {
          cy.get('[name="btnExcluirPokemon"]').should('be.visible').click();
        });
      
      cy.get(CARD_POKEMON_TESTE).should('not.exist')
})