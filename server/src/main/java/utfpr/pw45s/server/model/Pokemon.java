package utfpr.pw45s.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "O nome do pokemon não pode ser nulo!")
    @Size(min = 3, max = 50, message = "O nome do pokemon deve ter entre 3 a 50 caracteres.")
    private String nome;

    @NotNull(message = "O código da pokedex do pokemon não pode ser nulo!")
    private Integer codPokedex;

    @NotNull(message = "O tipo do pokemon não pode ser nulo!")
    @Size(min = 3, max = 50, message = "O tipo do pokemon deve ter entre 3 a 50 caracteres.")
    private String tipo;

    @NotNull(message = "O nível do pokemon não pode ser nulo!")
    private Integer nivel;

    @NotNull(message = "O ataque básico do pokemon não pode ser nulo!")
    @Size(min = 3, max = 100, message = "O ataque básico do pokemon deve ter entre 3 a 100 caracteres.")
    private String ataqueBasico;

    @NotNull(message = "O ataque carregado do pokemon não pode ser nulo!")
    @Size(min = 3, max = 100, message = "O ataque carregado do pokemon deve ter entre 3 a 100 caracteres.")
    private String ataqueCarregado;

    @Size(min = 2, max = 1024, message = "As observações do pokemon devem ter entre 2 a 1024 caracteres.")
    @Column(columnDefinition = "TEXT")
    private String observacoes;
}
