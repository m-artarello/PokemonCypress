package utfpr.pw45s.server.model;

public enum TipoPokemon {
    FOGO("Fogo"),
    AGUA("Água"),
    PLANTA("Planta"),
    ELETRICO("Elétrico"),
    GELO("Gelo"),
    PSICO("Psíquico"),
    DRAGAO("Dragão"),
    FADA("Fada"),
    NORMAL("Normal"),
    PEDRA("Pedra");

    private final String descricao;

    TipoPokemon(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getChave() {
        return this.name();
    }
}
