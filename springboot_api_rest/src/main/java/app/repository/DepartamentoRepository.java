package app.repository;


import app.model.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "departamentos", collectionResourceRel = "departamentos")
public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {
    //
}
