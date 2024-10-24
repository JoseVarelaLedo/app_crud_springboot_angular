package app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private String nickname;

    @Column(nullable = false, length = 30)
    private String contrasena;

    @ManyToOne
    @JoinColumn(name = "rol_id", referencedColumnName = "id")
    @JsonIgnore
    private Rol rol;

    @OneToOne
    @JoinColumn(name = "empleado_id")
    @JsonIgnore
    private Empleado empleado;

    @Column
    private LocalDateTime fechaRegistro;

    @PrePersist
    private void onCreate(){
        this.fechaRegistro = LocalDateTime.now();
    }
}
