import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPokemon } from "../../commons/interfaces";
import PokemonService from "../../service/PokemonService";
import { Box, Heading, Textarea, Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from "@chakra-ui/react";
import logo from "../../assets/pokemon_logo-removebg-preview.png";
import axios from "axios";

export function CadastroPokemonPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<IPokemon>({
    nome: "",
    codPokedex: 0,
    tipo: "",
    nivel: 0,
    ataqueBasico: "",
    ataqueCarregado: "",
    observacoes: ""
  });
  
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [tipos, setTipos] = useState<{ chave: string; descricao: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string | null>>({
    nome: null,
    codPokedex: null,
    tipo: null,
    nivel: null,
    ataqueBasico: null,
    ataqueCarregado: null,
    observacoes: null
  });

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await PokemonService.findTypes();
        setTipos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os tipos de Pokémon:', error);
      }
    };

    fetchTipos();
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (id) {
        try {
          const response = await PokemonService.findById(Number(id));
          setForm(response.data);
        } catch (error) {
          console.error('Erro ao buscar Pokémon:', error);
        }
      }
    };

    fetchPokemon();
  }, [id]);

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {};

    if (!form.nome.trim()) {
      newErrors.nome = "O nome do Pokémon não pode ser vazio!";
    } else if (form.nome.length < 3 || form.nome.length > 50) {
      newErrors.nome = "O nome do Pokémon deve ter entre 3 a 50 caracteres.";
    }

    if (form.codPokedex <= 0) {
      newErrors.codPokedex = "O código da Pokédex deve ser um número positivo.";
    }

    if (!form.tipo) {
      newErrors.tipo = "O tipo do Pokémon não pode ser nulo!";
    }

    if (form.nivel <= 0) {
      newErrors.nivel = "O nível do Pokémon deve ser um número positivo.";
    }

    if (!form.ataqueBasico.trim()) {
      newErrors.ataqueBasico = "O ataque básico não pode ser vazio!";
    } else if (form.ataqueBasico.length < 3 || form.ataqueBasico.length > 100) {
      newErrors.ataqueBasico = "O ataque básico do Pokémon deve ter entre 3 a 100 caracteres.";
    }

    if (!form.ataqueCarregado.trim()) {
      newErrors.ataqueCarregado = "O ataque carregado não pode ser vazio!";
    } else if (form.ataqueCarregado.length < 3 || form.ataqueCarregado.length > 100) {
      newErrors.ataqueCarregado = "O ataque carregado do Pokémon deve ter entre 3 a 100 caracteres.";
    }

    return newErrors;
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: name === 'codPokedex' || name === 'nivel' ? Number(value) : value, // Converte para número se necessário
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: null, // Limpa o erro definindo como null
    }));
  };

  const onClickSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPendingApiCall(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).some((key) => validationErrors[key] !== null)) {
      setErrors(validationErrors);
      setPendingApiCall(false);
      return;
    }

    const pokemon: IPokemon = {
      ...form
    };

    try {
      const response = await PokemonService.save(pokemon);
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Sucesso!",
          description: "Pokémon cadastrado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
        navigate("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors);
        } else {
          setApiError("Ocorreu um erro ao salvar o Pokémon.");
        }
      } else {
        setApiError("Ocorreu um erro inesperado.");
      }
    } finally {
      setPendingApiCall(false);
    }
  };

  return (
    <div className="background" style={{ justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh' }}>
      <div className="d-flex text-center justify-content-center align-items-center">
        <img src={logo} alt="Pokemon Logo" />
      </div>
      <Box bg={'#ffe27b'} p={4} className="container mt-2" style={{ width: '50%', borderRadius: '10px' }}>
        <div className="d-flex justify-content-center">
          <Heading as="h3" size="lg" mb={4}>Cadastro de Pokémons</Heading>
        </div>
        <main className="form-signup w-100 m-auto">
          <form>
            {apiError && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertTitle>Erro!</AlertTitle>
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert status="success" mb={4}>
                <AlertIcon />
                <AlertTitle>Sucesso!</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <div className="form-floating grid">
              <div className="d-flex row">
                <div className="col-2">
                  <label htmlFor="cod">Código<span style={{ color: 'red' }}> *</span></label>
                  <input
                    name="codPokedex"
                    className="form-control"
                    type="number"
                    placeholder="0"
                    onChange={onChange}
                    value={form.codPokedex}
                    id="codPokedex"
                  />
                  {errors.codPokedex && <span className="text-danger" style={{ marginTop: '0.2rem', fontSize: '0.5rem',  lineHeight: '1', display: 'inline-block' }}>{errors.codPokedex}</span>}
                </div>
                <div className="col-8">
                  <label htmlFor="nome">Nome do Pokémon<span style={{ color: 'red' }}> *</span></label>
                  <input
                    name="nome"
                    className="form-control"
                    type="text"
                    placeholder="Ex.: Bulbasaur"
                    onChange={onChange}
                    value={form.nome}
                    id="nome"
                  />
                  {errors.nome && <span className="text-danger" style={{ marginTop: '0.2rem', fontSize: '0.5rem',  lineHeight: '1', display: 'inline-block' }}>{errors.nome}</span>}
                </div>
                <div className="col-2">
                  <label htmlFor="nivel">Nível<span style={{ color: 'red' }}> *</span></label>
                  <input
                    name="nivel"
                    className="form-control"
                    type="number"
                    placeholder="Ex: 36"
                    onChange={onChange}
                    value={form.nivel}
                    id="nivel"
                  />
                  {errors.nivel && <span className="text-danger" style={{ marginTop: '0.2rem', fontSize: '0.5rem',  lineHeight: '1', display: 'inline-block' }}>{errors.nivel}</span>}
                </div>
              </div>
              <div className="d-flex row">
                <div className="col-4">
                  <label htmlFor="tipo">Tipo<span style={{ color: 'red' }}> *</span></label>
                  <select
                    name="tipo"
                    className="form-control"
                    value={form.tipo}
                    onChange={onChange}
                    id="tipo"
                  >
                    <option value="">Selecione um tipo</option>
                    {tipos.map((tipo) => (
                      <option key={tipo.chave} value={tipo.chave}>
                        {tipo.descricao}
                      </option>
                    ))}
                  </select>
                  {errors.tipo && <span className="text-danger" style={{ marginTop: '0.2rem', fontSize: '0.5rem',  lineHeight: '1', display: 'inline-block' }}>{errors.tipo}</span>}
                </div>
                <div className="col-4">
                  <label htmlFor="ataqueBasico">Ataque Básico<span style={{ color: 'red' }}> *</span></label>
                  <input
                    name="ataqueBasico"
                    className="form-control"
                    type="text"
                    placeholder="Ex.: Chicote de vinha"
                    onChange={onChange}
                    value={form.ataqueBasico}
                    id="ataqueBasico"
                  />
                  {errors.ataqueBasico && <span className="text-danger" style={{ marginTop: '0.2rem', fontSize: '0.5rem',  lineHeight: '1', display: 'inline-block' }}>{errors.ataqueBasico}</span>}
                </div>
                <div className="col-4">
                  <label htmlFor="ataqueCarregado">Ataque Carregado<span style={{ color: 'red' }}> *</span></label>
                  <input
                    name="ataqueCarregado"
                    className="form-control"
                    placeholder="Ex.: Bomba de sementes"
                    type="text"
                    onChange={onChange}
                    value={form.ataqueCarregado}
                    id="ataqueCarregado"
                  />
                  {errors.ataqueCarregado && <span className="text-danger" style={{ fontSize: '0.5rem', lineHeight: '1.2' }}>{errors.ataqueCarregado}</span>}
                </div>
              </div>
              <div className="d-flex row">
                <div className="col-12">
                  <label htmlFor="observacoes">Observações</label>
                  <Textarea
                    name="observacoes"
                    className="form-control"
                    placeholder="Ex.: POKÉMON SEMENTE - Bulbasaur pode ser visto tirando uma soneca ao sol. A semente em suas costas cresce cada vez mais à medida que absorve raios solares."
                    onChange={onChange}
                    value={form.observacoes}
                    bg= 'white'
                    rows={3}
                    id="observacoes"
                  />
                </div>
              </div>
            </div>
            <div  className="d-flex justify-content-evenly mt-4">
              <button className="link-secondary" onClick={() => navigate("/")}>
                Voltar para a Pokédex
              </button>
              <button className="btn btn-success" onClick={onClickSave} disabled={pendingApiCall}>
                {pendingApiCall ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </main>
      </Box>
    </div>
  );
}
