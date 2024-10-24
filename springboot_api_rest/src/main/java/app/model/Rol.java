package app.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@Data
@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_rol", nullable = false, unique = true, length = 50)
    private String nombreRol;

//    @OneToMany(mappedBy = "rol")
//    private Set<Usuario> usuarios = new HashSet<>();
}
