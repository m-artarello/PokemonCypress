package utfpr.pw45s.server.service.implementation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import utfpr.pw45s.server.model.Pokemon;
import utfpr.pw45s.server.repository.PokemonRepository;
import utfpr.pw45s.server.service.PokemonService;

@Service
public class PokemonServiceImplementation extends CrudServiceImplementation<Pokemon, Long> implements PokemonService {
    private PokemonRepository pokemonRepository;

    public PokemonServiceImplementation(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    @Override
    protected JpaRepository<Pokemon, Long> getRepository() {
        return this.pokemonRepository;
    }
}
