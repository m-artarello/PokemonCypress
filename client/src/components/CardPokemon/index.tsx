import { Button, useToast } from "@chakra-ui/react";
import { IPokemon } from "../../commons/interfaces";

const PokemonCard: React.FC<{ 
  pokemon: IPokemon; 
  onEdit: (id: number) => void; 
  onRemove: (id: number) => void; 
}> = ({ pokemon, onEdit, onRemove }) => {
  const toast = useToast();

  const handleRemove = () => {
    onRemove(pokemon.id!);
    toast({
      title: "Pokémon removido",
      description: `${pokemon.nome} foi removido com sucesso.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right"
    });
  };

  return (
    <div data-nome={pokemon.nome} style={{
      border: '5px solid #1d2b5a',
      borderRadius: '10px',
      padding: '15px',
      width: '300px',
      textAlign: 'center',
      boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
      background: '#ffffffa8'
    }}>
      <h3>
        {pokemon.codPokedex} | {pokemon.nome}
      </h3>
      <div className="d-flex justify-content-evenly">
        <div className="d-flex justify-content-center">
          <p style={{ color: '#1d2b5a', fontWeight: '500', marginRight: '5px' }}>Tipo: </p><p> {pokemon.tipo}</p>
        </div>
        <div className="d-flex justify-content-center">
          <p style={{ color: '#1d2b5a', fontWeight: '500', marginRight: '5px' }}>Nível: </p><p> {pokemon.nivel}</p>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <p style={{ color: '#1d2b5a', fontWeight: '500', marginRight: '5px' }}>Ataque básico: </p><p> {pokemon.ataqueBasico}</p>
      </div>
      <div className="d-flex justify-content-center">
        <p style={{ color: '#1d2b5a', fontWeight: '500', marginRight: '5px' }}>Ataque carregado: </p><p> {pokemon.ataqueCarregado}</p>
      </div>

      <p>{pokemon.observacoes}</p>

      <div className="d-flex justify-content-evenly">
        <Button onClick={() => onEdit(pokemon.id!)} colorScheme="blue" name="btnEditarPokemon" >Editar</Button>
        <Button onClick={handleRemove} colorScheme="red" name="btnExcluirPokemon">Excluir</Button>
      </div>
    </div>
  );
};

export default PokemonCard;
