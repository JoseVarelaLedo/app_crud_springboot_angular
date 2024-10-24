package app.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoDTO {
    private Integer id;
    private String nombre;
    private String apellidos;
    private String telefono;
    private String correoElectronico;
    private String direccion;
    private String nickname;
    private String contrasena;
    private Boolean esJefe;
    private Integer departamentoId;
    private String nombreDepartamento;
    private LocalDate fechaNacimiento;
    private LocalDateTime fechaRegistro;
}
