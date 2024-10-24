package app.repository;

import app.model.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource (path = "contactos", collectionResourceRel = "contactos")
public interface ContactoRepository extends JpaRepository <Contacto, Integer>{
}
