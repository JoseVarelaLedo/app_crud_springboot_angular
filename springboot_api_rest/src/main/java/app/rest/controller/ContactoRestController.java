package app.rest.controller;

import app.exceptions.ResourceNotFoundException;
import app.model.Contacto;
import app.service.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/contactos")
@CrossOrigin(origins = "http://localhost:4200/")
public class ContactoRestController {
    @Autowired
    private ContactoService contactoService;

    /**
     *  Método para listar los contactos
     * @return ResponseEntity con lista de contactos
     */
    @GetMapping
    public ResponseEntity<Page<Contacto>> getTodosContactos(
            @RequestParam(defaultValue = "0") int pag,
            @RequestParam(defaultValue = "7") int tam,
            @RequestParam(defaultValue = "id") String campoOrdenacion,
            @RequestParam(defaultValue = "asc") String direccionOrdenacion){
        return ResponseEntity.ok(contactoService.listarContactos(pag, tam, campoOrdenacion, direccionOrdenacion));
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Contacto> getContactoPorId(@PathVariable Integer id){
       try{
           Contacto contacto = contactoService.obtenerContactoPorId(id);
           return ResponseEntity.ok (contacto);
       }catch (ResourceNotFoundException ex){
           throw new ResourceNotFoundException("Contacto " + id + " no encontrado");
       }
    }

    @PostMapping
    public ResponseEntity<Contacto> crearContacto(@RequestBody Contacto contacto) {
        try {
            contactoService.crearContacto(contacto);
            return new ResponseEntity<>(contacto, HttpStatus.CREATED); // Retorna 201 CREATED
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // Si ocurre un error, retorna 500
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contacto> updateContacto(@PathVariable Integer id, @RequestBody Contacto datosActualizados) {
        try {
            Contacto contactoExistente = contactoService.obtenerContactoPorId(id);

            // Se crea un nuevo objeto Contacto combinando valores viejos y nuevos usando Builder de Lombok
            Contacto contactoActualizado = Contacto.builder()
                    .id(contactoExistente.getId()) // Se mantiene el mismo ID
                    .nombre(datosActualizados.getNombre() != null ? datosActualizados.getNombre() : contactoExistente.getNombre())
                    .apellidos(datosActualizados.getApellidos() != null ? datosActualizados.getApellidos() : contactoExistente.getApellidos())
                    .telefono(datosActualizados.getTelefono() != null ? datosActualizados.getTelefono() : contactoExistente.getTelefono())
                    .email(datosActualizados.getEmail() != null ? datosActualizados.getEmail() : contactoExistente.getEmail())
                    .direccion(datosActualizados.getDireccion() != null ? datosActualizados.getDireccion() : contactoExistente.getDireccion())
                    .fechaRegistro(contactoExistente.getFechaRegistro()) // Se mantiene la fecha de registro original
                    .build();

            contactoService.actualizarContacto(contactoActualizado);
            return ResponseEntity.ok(contactoActualizado);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Contacto " + id + " no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> borrarContacto(@PathVariable Integer id) {
        try {
            Contacto contacto = contactoService.obtenerContactoPorId(id);
            if (contacto == null) {
                throw new ResourceNotFoundException("Contacto " + id + " no encontrado");
            }
            contactoService.borrarContacto(id);

            // Respuesta de éxito
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);

        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Contacto " + id + " no encontrado");
        }
    }
}
