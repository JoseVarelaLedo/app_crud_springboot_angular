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
@Table (name="empleado",uniqueConstraints = {
        @UniqueConstraint(columnNames = "nickname"),
        @UniqueConstraint(columnNames = "correo_electronico")
})
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(length = 15, nullable = false, unique = true)
    private String telefono;

    @Column(length = 255, nullable = false)
    private String direccion;

    @Column(name = "correo_electronico", nullable = false, unique = true, length = 100)
    private String correoElectronico;

    @Column(name = "es_jefe")
    private Boolean esJefe = false;

    @Column(name = "nickname", nullable = false, unique = true, length = 50)
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "departamento_id", nullable=false,referencedColumnName = "id")
    @JsonIgnore
    private Departamento departamento;

    @OneToOne(mappedBy = "empleado", cascade = CascadeType.ALL)
    @JsonIgnore
    private Contacto contacto;

    @OneToOne(mappedBy = "empleado", cascade = CascadeType.ALL)
    @JsonIgnore
    private Usuario usuario;

    @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)
    private LocalDate fechaNacimiento;

    private LocalDateTime fechaRegistro;

    @PrePersist
    private void onCreate(){
        this.fechaRegistro = LocalDateTime.now();
    }
}
