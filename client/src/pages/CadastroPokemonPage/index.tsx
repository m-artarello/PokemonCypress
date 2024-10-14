import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/index.scss";
import { IPokemon } from "../../commons/interfaces";
import PokemonService from "../../service/PokemonService";

export function CadastroPokemonPage() {
  const [form, setForm] = useState<IPokemon>({
    nome: "",
    codPokedex: 0,
    tipo: "",
    nivel: 0,
    ataqueBasico: "",
    ataqueCarregado: "",
    observacoes: ""
  });
  const [errors, setErrors] = useState({
    nome: "",
    codPokedex: 0,
    tipo: "",
    nivel: 0,
    ataqueBasico: "",
    ataqueCarregado: "",
    observacoes: ""
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [senhaRepeatError, setSenhaRepeatError] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    
  }, [form]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: undefined,
    }));

  };

  const onClickSave = async () => {
    const pokemon: IPokemon = {
      nome: form.nome,
      codPokedex: form.codPokedex,
      tipo: form.tipo,
      nivel: form.nivel,
      ataqueBasico: form.ataqueBasico,
      ataqueCarregado: form.ataqueCarregado,
      observacoes:form.observacoes
    };
    setPendingApiCall(true);

    const response = await PokemonService.save(pokemon);


    if (response.status === 200 || response.status === 201) {
      navigate("/");
    } else if (response) {
      if (response.data && response.data.validationErrors) {
        setErrors(response.data.validationErrors);
      }
      setApiError("Ocorreu um erro ao salvar o Pokemom.");
    }
    setPendingApiCall(false);
  };

  return (
    <>
    </>
  );
}
