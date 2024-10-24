package app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table (name="contacto", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class Contacto {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column (nullable = false, length = 50)
    private String nombre;
    @Column (nullable = false, length = 50)
    private String apellidos;
    @Column (nullable = false, unique = true, length = 50)
    private String telefono;
    @Column (nullable = false, unique = true, length = 100)
    private String email;
    @Column (nullable = false, length = 255)
    private String direccion;

    @OneToOne
    @JoinColumn(name = "empleado_id")
    @JsonIgnore
    private Empleado empleado;

    private LocalDateTime fechaRegistro;
    @PrePersist
    private void onCreate(){
        this.fechaRegistro = LocalDateTime.now();
    }


}
