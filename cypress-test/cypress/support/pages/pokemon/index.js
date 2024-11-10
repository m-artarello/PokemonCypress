const el = require('./elements').ELEMENTS

class Pokemon {
    deletarPokemon(pokemonid) {
        cy.request('GET', '/pokemon')
            .then((response) => {
                // Filtra os pokémons que possuem codPokedex igual a 10
                const pokemonsComCodPokedex10 = response.body.filter(pokemon => pokemon.codPokedex === 10);

                // Para cada pokémon encontrado, chama o método de deletação
                pokemonsComCodPokedex10.forEach(pokemon => {
                    deletarPokemon(pokemon.id);
                });
            });
    }
}

export default new Pokemon();