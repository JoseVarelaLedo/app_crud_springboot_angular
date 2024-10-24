package app.service;

import app.model.Departamento;
import app.repository.DepartamentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DepartamentoService {
    @Autowired
    private DepartamentoRepository departamentoRepository;

    public Page<Departamento> listarDepartamento(int pag, int tam, String campoOrdenacion, String direccionOrdenacion) {
        Sort.Direction direccion  = direccionOrdenacion.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        // Crear el objeto Pageable
        Pageable pageable = PageRequest.of(pag, tam, Sort.by(direccion, campoOrdenacion));
        return departamentoRepository.findAll(pageable);
    }

    @Transactional
    public void crearDepartamento(Departamento departamento) {
        departamentoRepository.save(departamento);
    }

    public Departamento obtenerDepartamentoPorID(Integer id) {
        return departamentoRepository.findById(id).orElse(null);
    }

    @Transactional
    public void actualizarDepartamento(Departamento departamento) {
        departamentoRepository.save(departamento);
    }

    public void borrarDepartamento(Integer id) {
        departamentoRepository.deleteById(id);
    }
}
