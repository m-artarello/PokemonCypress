import { useState, useEffect } from  "react";
import { useNavigate } from  "react-router-dom";
import { IPokemon } from "../../commons/interfaces";
import PokemonService from "../../service/PokemonService";
import PokemonCard from "../../components/CardPokemon";
import { Box, Button, Grid, Text } from "@chakra-ui/react";

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import logo from "@/assets/pokemon_logo-removebg-preview.png"

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

	
    const PaginatedPokemon = () => {
        const [currentPage, setCurrentPage] = useState(0);
        const pageSize = 25;
        const totalPages = Math.ceil(data.length / pageSize);

        const paginatedData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

        const nextPage = () => {
            if (currentPage < totalPages - 1) {
                setCurrentPage(currentPage + 1);
            }
        };

        const prevPage = () => {
            if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
            }
        };
        return (
            <>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={3}>
                    {paginatedData.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </Grid>
				<div className="mt-3 d-flex justify-content-center">
                    <Button onClick={prevPage} disabled={currentPage === 0} leftIcon={<IoIosArrowBack />} className="btn me-1"></Button>
                    <Button onClick={nextPage} disabled={currentPage === totalPages - 1} rightIcon={<IoIosArrowForward />} className="btn"></Button>
                </div>
            </>
        )

    }

	return (
		<>
		  <Box className="background" mt="2rem" mx="auto" px={4} style={{height: '100vh'}}>
                <div className=" d-flex text-center justify-content-center align-items-center">
                    <img src={logo}></img>
                </div>
                <div className="my-3 d-flex text-center justify-content-center align-items-center">
                    <button className="btn btn-success">
                        <a href="/cadastrar">Cadastrar Pokémon</a></button>
                </div>
                {data.length === 0 ? (
                    <Box mt={8} textAlign="center" className="d-flex align-items-center">
                        <Text fontSize="lg">Nenhum pokémon cadastrado.</Text>
                    </Box>
                ) : (
                    <PaginatedPokemon/>
                )}
            </Box>
            {apiError && (
                <Box mt={4} textAlign="center">
                    <Text fontSize="lg" color="red.500">{apiError}</Text>
                </Box>
            )}
		</>
	  );
}