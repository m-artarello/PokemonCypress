import { Route, Routes } from "react-router-dom";
import { CadastroPokemonPage } from '../../pages/CadastroPokemonPage';
import { ListagemPokemonPage } from "@/pages/ListagemPokemonPage";

function App() {
    return (
        <Routes>
            <Route path="/cadastrar" element={<CadastroPokemonPage />} />
            <Route path="/" element={<ListagemPokemonPage />} />
        </Routes>
    );
}

export default App;