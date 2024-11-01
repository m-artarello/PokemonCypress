import { ChangeEvent } from "react";

export interface IPokemon {
    id?: number;
    nome: string;
    codPokedex: number;
    tipo: string;
    nivel: number;
    ataqueBasico: string;
    ataqueCarregado: string;
    observacoes: string;
  }
// Componente que representa uma carta de Pokémon
const PokemonCard: React.FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
    return (
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '15px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        background: '#fff'}}>
        <h3>{pokemon.nome}</h3>
        <p>Nº Pokédex: {pokemon.codPokedex}</p>
        <p>Tipo: {pokemon.tipo}</p>
        <p>Nível: {pokemon.nivel}</p>
        <h4>Ataques:</h4>
        <ul style={{listStyle: 'none'}}>
          <li>{pokemon.ataqueBasico}</li>
          <li>{pokemon.ataqueCarregado}</li>
        </ul>
        <p>Observações: {pokemon.observacoes}</p>
      </div>
    );
  };

  // Estilos simples
const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      width: '50px',
      textAlign: 'center',
      boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
    },
  };
  
  export default PokemonCard;