package app.rest.controller;

import app.dto.UsuarioDTO;
import app.exceptions.ResourceNotFoundException;
import app.model.Usuario;
import app.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin (origins = "http://localhost:4200/")
public class UsuarioRestController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    private ResponseEntity<Page<UsuarioDTO>> getTodosUsuarios(
            @RequestParam(defaultValue = "0") int pag,
            @RequestParam(defaultValue = "7") int tam,
            @RequestParam(defaultValue = "id") String campoOrdenacion,
            @RequestParam(defaultValue = "asc") String direccionOrdenacion){
        return ResponseEntity.ok(usuarioService.listarUsuarios(pag, tam, campoOrdenacion, direccionOrdenacion));
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Usuario> getUsuarioPorId(@PathVariable Integer id){
        try{
            Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
            return ResponseEntity.ok (usuario);
        }catch (ResourceNotFoundException ex){
            throw new ResourceNotFoundException("Usuario " + id + " no encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario nuevoUsuario = usuarioService.crearUsuario(usuarioDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario); // Retorna 201 CREATED
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // Si ocurre un error, retorna 500
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Integer id, @RequestBody Usuario datosActualizados) {
        try {
            Usuario usuarioExistente = usuarioService.obtenerUsuarioPorId(id);

            // Se crea un nuevo objeto Contacto combinando valores viejos y nuevos usando Builder de Lombok
            Usuario usuarioActualizado = Usuario.builder()
                    .id(usuarioExistente.getId()) // Se mantiene el mismo ID
                    .nickname(datosActualizados.getNickname() != null ? datosActualizados.getNickname() : usuarioExistente.getNickname())
                    .contrasena(datosActualizados.getContrasena() != null ? datosActualizados.getContrasena() : usuarioExistente.getContrasena())
                    .fechaRegistro(usuarioExistente.getFechaRegistro()) // Se mantiene la fecha de registro original
                    .build();

            usuarioService.actualizarUsuario(usuarioActualizado);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Usuario " + id + " no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> borrarUsuario(@PathVariable Integer id) {
        try {
            Usuario usurio = usuarioService.obtenerUsuarioPorId(id);
            if (usurio == null) {
                throw new ResourceNotFoundException("Usuario " + id + " no encontrado");
            }
            usuarioService.borrarUsuario(id);

            // Respuesta de éxito
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);

        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Usuario " + id + " no encontrado");
        }
    }
}