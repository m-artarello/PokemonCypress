import { useState, useEffect } from  "react";
import { Link, useNavigate } from  "react-router-dom";
import { IPokemon } from "../../commons/interfaces";
import PokemonService from "../../service/PokemonService";

export  function ListagemPokemonPage() {
	const [data, setData] = useState<IPokemon[]>([]);
	const [apiError, setApiError] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		loadData();
	}, []);
	const loadData = () => {
		PokemonService.findAll()
			.then((response) => {
				setData(response.data);
				setApiError("");
			})
			.catch((error) => {
				setApiError("Falha ao carregar a lista de pokemons.");
			});
	}
	const onEdit = (url: string) => {
		navigate(url);
	}
	const onRemove = (id: number) => {
		PokemonService.remove(id)
			.then((response) => {
				loadData();
				setApiError("");})
			.catch((error) => {
				setApiError("Falha ao remover o pokemon.");
			});
	}
	return (
        <>
        </>
	)
}