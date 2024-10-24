package app.service;


import app.dto.UsuarioDTO;
import app.model.Rol;
import app.model.Usuario;
import app.repository.RolRepository;
import app.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;


import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;


    public Page<UsuarioDTO> listarUsuarios(int pag, int tam, String campoOrdenacion, String direccionOrdenacion) {
        Sort.Direction direccion = direccionOrdenacion.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pag, tam, Sort.by(direccion, campoOrdenacion));
        Page<Usuario> usuariosPage = usuarioRepository.findAll(pageable);

        return usuariosPage.map(usuario -> {
            UsuarioDTO dto = new UsuarioDTO();
            dto.setId(usuario.getId());
            dto.setNickname(usuario.getNickname());
            dto.setContrasena(usuario.getContrasena());
            dto.setFechaRegistro(usuario.getFechaRegistro());

            // Verificar si el rol es nulo
            if (usuario.getRol() != null) {
                dto.setRolID(usuario.getRol().getId());
                dto.setNombreRol(usuario.getRol().getNombreRol());
            } else {
                dto.setRolID(null);
                dto.setNombreRol(null);
            }

            return dto;
        });
    }


    @Transactional
    public Usuario crearUsuario(UsuarioDTO usuarioDTO) {
        Optional<Rol> rolOptional = rolRepository.findById(usuarioDTO.getRolID());

        if (!rolOptional.isPresent()) {
            throw new RuntimeException("Rol no encontrado");
        }
        Rol rol = rolOptional.get();

        Usuario usuario = new Usuario();
        usuario.setNickname(usuarioDTO.getNickname());
        usuario.setContrasena(usuarioDTO.getContrasena());
        usuario.setFechaRegistro(usuarioDTO.getFechaRegistro());
        usuario.setRol(rol); // Asocia el rol
        return usuarioRepository.save(usuario);


//        usuarioRepository.save(usuario);
    }

    public Usuario obtenerUsuarioPorId(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Transactional
    public void actualizarUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public void borrarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }
}