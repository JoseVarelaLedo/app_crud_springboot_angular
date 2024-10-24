package app.dto;

import lombok.*;


import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Integer id;
    private String nickname;
    private String contrasena;
    private Integer rolID;
    private String nombreRol;
    private LocalDateTime fechaRegistro;
}