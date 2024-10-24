package app.rest.controller;

import app.exceptions.ResourceNotFoundException;
import app.model.Departamento;
import app.service.DepartamentoService;
import app.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import org.springframework.data.domain.Page;
import java.util.Map;


@RestController
@RequestMapping("/departamentos")
@CrossOrigin(origins = "http://localhost:4200/")
public class DepartamentoRestController {
    @Autowired
    private DepartamentoService departamentoService;
    @Autowired
    private EmpleadoService empleadoService;
    @GetMapping
    private ResponseEntity<Page<Departamento>> getTodosDepartamentos(
            @RequestParam(defaultValue = "0") int pag,
            @RequestParam(defaultValue = "7") int tam,
            @RequestParam(defaultValue = "id") String campoOrdenacion,
            @RequestParam(defaultValue = "asc") String direccionOrdenacion){
        return ResponseEntity.ok(departamentoService.listarDepartamento(pag, tam, campoOrdenacion, direccionOrdenacion));
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Departamento> getContactoPorId(@PathVariable Integer id){
        try{
            Departamento departamento = departamentoService.obtenerDepartamentoPorID(id);
            return ResponseEntity.ok (departamento);
        }catch (ResourceNotFoundException ex){
            throw new ResourceNotFoundException("Departamento " + id + " no encontrado");
        }
    }


    @PostMapping
    public ResponseEntity<Departamento> crearDepartamento(@RequestBody Departamento departamento) {
        try {
            departamentoService.crearDepartamento(departamento);
            return new ResponseEntity<>(departamento, HttpStatus.CREATED); // Retorna 201 CREATED
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // Si ocurre un error, retorna 500
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Departamento> updateDepartamento(@PathVariable Integer id, @RequestBody Departamento datosActualizados) {
        try {
            Departamento departamentoExistente = departamentoService.obtenerDepartamentoPorID(id);

            // Se crea un nuevo objeto Contacto combinando valores viejos y nuevos usando Builder de Lombok
            Departamento departamentoActualizado = Departamento.builder()
                    .id(departamentoExistente.getId()) // Se mantiene el mismo ID
                    .nombreDepartamento(datosActualizados.getNombreDepartamento() != null ? datosActualizados.getNombreDepartamento() : departamentoExistente.getNombreDepartamento())
                    .fechaRegistro(departamentoExistente.getFechaRegistro()) // Se mantiene la fecha de registro original
                    .build();

            departamentoService.actualizarDepartamento(departamentoActualizado);
            return ResponseEntity.ok(departamentoActualizado);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Departamento " + id + " no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> borrarDepartamento(@PathVariable Integer id) {
        try {
            Departamento departamento = departamentoService.obtenerDepartamentoPorID(id);
            if (departamento == null) {
                throw new ResourceNotFoundException("Departamento " + id + " no encontrado");
            }
            departamentoService.borrarDepartamento(id);

            // Respuesta de éxito
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);

        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Departamento " + id + " no encontrado");
        }
    }
}
