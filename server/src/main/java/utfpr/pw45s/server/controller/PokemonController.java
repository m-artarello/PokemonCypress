package utfpr.pw45s.server.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utfpr.pw45s.server.dto.PokemonDto;
import utfpr.pw45s.server.model.Pokemon;
import utfpr.pw45s.server.service.CrudService;
import utfpr.pw45s.server.service.PokemonService;

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

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }
}
