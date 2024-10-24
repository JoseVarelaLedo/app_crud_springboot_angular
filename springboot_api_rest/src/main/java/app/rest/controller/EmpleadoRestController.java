package app.rest.controller;

import app.dto.EmpleadoDTO;
import app.exceptions.ResourceNotFoundException;
import app.model.Empleado;
import app.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/empleados")
@CrossOrigin(origins = "http://localhost:4200/")

public class EmpleadoRestController {
    @Autowired
    private EmpleadoService empleadoService;


//    @GetMapping
//    public ResponseEntity<List<EmpleadoDTO>> listarEmpleados() {
//        List<EmpleadoDTO> empleados = empleadoService.listarEmpleados();
//        return ResponseEntity.ok(empleados);
//    }


//    @GetMapping
//    public ResponseEntity<List<EmpleadoDTO>> listarEmpleados(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "7") int size) {
//        List<EmpleadoDTO> empleados = empleadoService.listarEmpleados(page, size);
//        return ResponseEntity.ok(empleados);
//    }
    @GetMapping
    public ResponseEntity<Page<EmpleadoDTO>> listarEmpleados(
            @RequestParam(defaultValue = "0") int pag,
            @RequestParam(defaultValue = "7") int tam,
            @RequestParam(defaultValue = "id") String campoOrdenacion,
            @RequestParam(defaultValue = "asc") String direccionOrdenacion) {
        // Llama al servicio y devuelve la respuesta paginada
        return ResponseEntity.ok(empleadoService.listarEmpleados(pag, tam, campoOrdenacion, direccionOrdenacion));
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Empleado> getEmpleadoPorId(@PathVariable Integer id){
        try{
            Empleado empleado = empleadoService.obtenerEmpleadoPorId(id);
            return ResponseEntity.ok (empleado);
        }catch (ResourceNotFoundException ex){
            throw new ResourceNotFoundException("Empleado " + id + " no encontrado");
        }
    }

    @GetMapping("/jefe-departamento/{departamentoId}")
    public ResponseEntity<Empleado> obtenerJefePorDepartamento(@PathVariable Integer departamentoId) {
        Optional<Empleado> jefe = empleadoService.obtenerJefePorDepartamento(departamentoId);
        if (jefe.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(jefe.get());
    }

    @PostMapping
    public ResponseEntity<Empleado> crearEmpleado(@RequestBody EmpleadoDTO empleadoDTO) {
        Empleado nuevoEmpleado = empleadoService.crearEmpleado(empleadoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEmpleado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Integer id, @RequestBody EmpleadoDTO empleadoDTO) {
        Empleado empleadoActualizado = empleadoService.actualizarEmpleado(id, empleadoDTO);
        return ResponseEntity.ok(empleadoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> borrarEmpleado(@PathVariable Integer id) {
        try {
            Empleado empleado = empleadoService.obtenerEmpleadoPorId(id);
            if (empleado == null) {
                throw new ResourceNotFoundException("Empleado " + id + " no encontrado");
            }
            empleadoService.borrarEmpleado(id);

            // Respuesta de éxito
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);

        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Empleado " + id + " no encontrado");
        }
    }
}
