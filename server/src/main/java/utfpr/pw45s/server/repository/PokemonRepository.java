package utfpr.pw45s.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utfpr.pw45s.server.model.Pokemon;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
}
