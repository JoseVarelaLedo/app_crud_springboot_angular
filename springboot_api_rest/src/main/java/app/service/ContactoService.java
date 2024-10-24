package app.service;

import app.model.Contacto;
import app.repository.ContactoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactoService {
    @Autowired
    private ContactoRepository contactoRepository;
    public Page<Contacto> listarContactos(int pag, int tam, String campoOrdenacion, String direccionOrdenacion) {
        Sort.Direction direccion  = direccionOrdenacion.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        // Crear el objeto Pageable
        Pageable pageable = PageRequest.of(pag, tam, Sort.by(direccion, campoOrdenacion));

        return contactoRepository.findAll(pageable);
    }

    @Transactional
    public void crearContacto(Contacto contacto) {
        contactoRepository.save(contacto);
    }

    public Contacto obtenerContactoPorId(Integer id) {
        return contactoRepository.findById(id).orElse(null);
    }

    @Transactional
    public void actualizarContacto(Contacto contacto) {
        contactoRepository.save(contacto);
    }

    public void borrarContacto(Integer id) {
        contactoRepository.deleteById(id);
    }
}
