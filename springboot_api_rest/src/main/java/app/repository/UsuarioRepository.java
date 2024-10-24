package app.repository;

import app.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;


@Repository
@RepositoryRestResource(path = "usuarios", collectionResourceRel = "usuarios")

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    //
}
