package app.service;

import app.dto.EmpleadoDTO;
import app.model.Contacto;
import app.model.Departamento;
import app.model.Empleado;
import app.model.Usuario;
import app.repository.ContactoRepository;
import app.repository.DepartamentoRepository;
import app.repository.EmpleadoRepository;
import app.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;


@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private ContactoRepository contactoRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    //Método original
//    public List<Empleado> listarEmpleados( ) {
//        return empleadoRepository.findAll();
//    }

    //Método totalmente funcional, sin paginación
//    public List<EmpleadoDTO> listarEmpleados() {
//        return empleadoRepository.findAll().stream().map(empleado -> {
//            EmpleadoDTO dto = new EmpleadoDTO();
//            dto.setId(empleado.getId());
//            dto.setNombre(empleado.getNombre());
//            dto.setApellidos(empleado.getApellidos());
//            dto.setTelefono(empleado.getTelefono());
//            dto.setDireccion(empleado.getDireccion());
//            dto.setCorreoElectronico(empleado.getCorreoElectronico());
//            dto.setEsJefe(empleado.getEsJefe());
//            dto.setNickname(empleado.getNickname());
//            dto.setFechaNacimiento(empleado.getFechaNacimiento());
//            dto.setFechaRegistro(empleado.getFechaRegistro());
//            dto.setDepartamentoId(empleado.getDepartamento().getId());
//            dto.setNombreDepartamento(empleado.getDepartamento().getNombreDepartamento());
////            System.out.println ("Departamento: " + empleado.getDepartamento().getNombreDepartamento());
//            return dto;
//        }).collect(Collectors.toList());
//    }
    public Page<EmpleadoDTO> listarEmpleados(int pag, int tam, String campoOrdenacion, String direccionOrdenacion) {
        Sort.Direction direccion  = direccionOrdenacion.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        // Crear el objeto Pageable
        Pageable pageable = PageRequest.of(pag, tam, Sort.by(direccion, campoOrdenacion));

        // Obtener la página de empleados desde el repositorio
        Page<Empleado> empleadosPage = empleadoRepository.findAll(pageable);


        // Convertir la página de entidades Empleado a DTOs
        return empleadosPage.map(empleado -> {
            EmpleadoDTO dto = new EmpleadoDTO();
            dto.setId(empleado.getId());
            dto.setNombre(empleado.getNombre());
            dto.setApellidos(empleado.getApellidos());
            dto.setTelefono(empleado.getTelefono());
            dto.setDireccion(empleado.getDireccion());
            dto.setCorreoElectronico(empleado.getCorreoElectronico());
            dto.setEsJefe(empleado.getEsJefe());
            dto.setNickname(empleado.getNickname());
            dto.setFechaNacimiento(empleado.getFechaNacimiento());
            dto.setFechaRegistro(empleado.getFechaRegistro());
            dto.setDepartamentoId(empleado.getDepartamento().getId());
            dto.setNombreDepartamento(empleado.getDepartamento().getNombreDepartamento());
            return dto;
        });

//        return empleadosDTOPage;
    }

    public Optional<Empleado> obtenerJefePorDepartamento(Integer departamentoId) {
        return empleadoRepository.findJefeByDepartamentoId(departamentoId);
    }

    @Transactional
    public Empleado crearEmpleado(EmpleadoDTO empleadoDTO) {
        // Busca el departamento por ID
        Optional<Departamento> departamentoOptional = departamentoRepository.findById(empleadoDTO.getDepartamentoId());
        if (!departamentoOptional.isPresent()) {
            throw new RuntimeException("Departamento no encontrado");
        }
        Departamento departamento = departamentoOptional.get();

        // Crear un nuevo empleado
        Empleado empleado = new Empleado();
        empleado.setNombre(empleadoDTO.getNombre());
        empleado.setApellidos(empleadoDTO.getApellidos());
        empleado.setTelefono(empleadoDTO.getTelefono());
        empleado.setDireccion(empleadoDTO.getDireccion());
        empleado.setCorreoElectronico(empleadoDTO.getCorreoElectronico());
        empleado.setEsJefe(empleadoDTO.getEsJefe());
        empleado.setNickname(empleadoDTO.getNickname());
        empleado.setFechaNacimiento(empleadoDTO.getFechaNacimiento());
        empleado.setDepartamento(departamento); // Asocia el departamento

        // Crear contacto
        Contacto contacto = new Contacto();
        contacto.setNombre(empleadoDTO.getNombre());
        contacto.setApellidos(empleadoDTO.getApellidos());
        contacto.setTelefono(empleadoDTO.getTelefono());
        contacto.setEmail(empleadoDTO.getCorreoElectronico());
        contacto.setDireccion(empleadoDTO.getDireccion());
        contacto.setEmpleado(empleado); // Asocia el contacto al empleado

        // Crear usuario
        Usuario usuario = new Usuario();
        usuario.setNickname(empleadoDTO.getNickname());
        usuario.setContrasena("default_password"); // Usa una contraseña predeterminada o una lógica para generar una

        // Asocia el contacto y usuario con el empleado
        empleado.setContacto(contacto);
        empleado.setUsuario(usuario);

        // Guarda el empleado (y sus relaciones por CascadeType.ALL)
        return empleadoRepository.save(empleado);
    }

    public Empleado obtenerEmpleadoPorId(Integer id) {
        return empleadoRepository.findById(id).orElse(null);
    }

    @Transactional
    // Método para actualizar empleado
    public Empleado actualizarEmpleado(Integer id, EmpleadoDTO empleadoDTO) {
        // Verificar si el empleado existe
        Optional<Empleado> empleadoOptional = empleadoRepository.findById(id);
        if (!empleadoOptional.isPresent()) {
            throw new RuntimeException("Empleado no encontrado");
        }

        Empleado empleado = empleadoOptional.get();

        // Actualizar los campos del empleado
        empleado.setNombre(empleadoDTO.getNombre());
        empleado.setApellidos(empleadoDTO.getApellidos());
        empleado.setTelefono(empleadoDTO.getTelefono());
        empleado.setDireccion(empleadoDTO.getDireccion());
        empleado.setCorreoElectronico(empleadoDTO.getCorreoElectronico());
        empleado.setEsJefe(empleadoDTO.getEsJefe());
        empleado.setNickname(empleadoDTO.getNickname());
        empleado.setFechaNacimiento(empleadoDTO.getFechaNacimiento());

        // Actualizar la relación con el departamento si es necesario
        if (empleadoDTO.getDepartamentoId() != null) {
            Optional<Departamento> departamentoOptional = departamentoRepository.findById(empleadoDTO.getDepartamentoId());
            if (!departamentoOptional.isPresent()) {
                throw new RuntimeException("Departamento no encontrado");
            }
            empleado.setDepartamento(departamentoOptional.get());
        }

        // Actualizar los datos en la tabla Contacto
        Contacto contacto = empleado.getContacto();
        if (contacto != null) {
            contacto.setNombre(empleado.getNombre());
            contacto.setApellidos(empleado.getApellidos());
            contacto.setTelefono(empleado.getTelefono()); // Aquí aseguramos que el teléfono se actualiza también en Contacto
            contacto.setEmail(empleado.getCorreoElectronico());
            contacto.setDireccion(empleado.getDireccion());
            contactoRepository.save(contacto);  // Guardamos los cambios en Contacto
        }

        // Actualizar los datos en la tabla Usuario
        Usuario usuario = empleado.getUsuario();
        if (usuario != null) {
            usuario.setNickname(empleado.getNickname());
            usuarioRepository.save(usuario);  // Guardamos los cambios en Usuario
        }

        // Guardar el empleado actualizado
        return empleadoRepository.save(empleado);
    }
    public void borrarEmpleado(Integer id) {
        empleadoRepository.deleteById(id);
    }
}
