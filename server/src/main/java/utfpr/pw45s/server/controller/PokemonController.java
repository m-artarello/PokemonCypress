package utfpr.pw45s.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utfpr.pw45s.server.dto.PokemonDto;
import utfpr.pw45s.server.model.Pokemon;
import utfpr.pw45s.server.service.CrudService;
import utfpr.pw45s.server.service.PokemonService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("pokemon")
public class PokemonController extends CrudController<Pokemon, PokemonDto, Long> {

    private final PokemonService pokemonService;
    private final ModelMapper modelMapper;

    public PokemonController(PokemonService pokemonService, ModelMapper modelMapper) {
        super(Pokemon.class, PokemonDto.class);
        this.pokemonService = pokemonService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected CrudService getService() {
        return this.pokemonService;
    }

    @GetMapping
    public ResponseEntity<List<PokemonDto>> findAll() {

        List<PokemonDto> pokemons = pokemonService.findAll(Sort.by("codPokedex"))
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        if (pokemons.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(pokemons);
        }
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    private PokemonDto convertToDto(Pokemon pokemon) {
        return getModelMapper().map(pokemon, PokemonDto.class);
    }
}
