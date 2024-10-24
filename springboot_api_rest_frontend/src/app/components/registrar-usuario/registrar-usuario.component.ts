import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {

  usuario: Usuario = {
    id: 0,
    nickname : '',
    contrasena: '',
    rolID: 0,
    nombreRol: '',
    fechaRegistro: new Date()
  };

  constructor ( private readonly usuarioService : UsuarioService,
    private readonly router : Router,
    private readonly translate: TranslateService ) { }


  ngOnInit(): void {
    //
  }

  guardarUsuario(){
    console.log("Datos del usuario a enviar:", this.usuario);

    this.usuarioService.registrarUsuario (this.usuario).subscribe(() =>{
      console.log (this.usuario);
      this.navigateListaUsuarios();
    }, error => console.log (error));
  }

  navigateListaUsuarios(){
    this.router.navigate(['/usuarios']);
    const title = this.translate.instant('swalUserCreated');
    const text = this.translate.instant('swalUserCreatedMessage', { nickname: this.usuario.nickname });
    const confirmButtonText = this.translate.instant('swalAccept');
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText
  });
  }

  onSubmit() {
    this.guardarUsuario();
  }
}
