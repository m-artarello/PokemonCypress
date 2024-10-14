import { api } from  '../lib/axios'
import { IPokemon } from '../commons/interfaces';

const  save = (pokemon: IPokemon) => {
	return  api.post('/pokemon', pokemon);
}
const  findAll = () => {
	return  api.get('/pokemon');
}
const  remove = (id: number) => {
	return  api.delete(`/pokemon/${id}`);
}
const  findById = (id: number) => {
	return  api.get(`/pokemon/${id}`);
}
const  PokemonService = {
	save,
	findAll,
	remove,
	findById,
}

export  default  PokemonService;