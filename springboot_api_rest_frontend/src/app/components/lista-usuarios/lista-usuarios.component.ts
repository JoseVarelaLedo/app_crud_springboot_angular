import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { TranslateModule, TranslateService, LangChangeEvent  } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  usuarios: Usuario[];
  page = 0;
  size = 7;
  totalElements = 0;
  totalPages = 0;
  sortField = 'id'; // Campo de ordenación por defecto
  sortDirection = 'asc'; // Dirección por defecto
  columnas: any[] = [];
  langChangeSubscription: Subscription;

  constructor (private readonly usuarioService:UsuarioService,
    private readonly router: Router,
    private readonly translate: TranslateService) { }

  ngOnInit(): void{
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.traducirColumnas();
    });
    this.traducirColumnas();
    this.obtenerUsuarios();
  }

  ngOnDestroy() {
    // Desuscribirse de los cambios de idioma cuando el componente se destruye
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private obtenerUsuarios(){
    this.usuarioService.obtenerListaDeUsuarios(this.page, this.size, this.sortField, this.sortDirection).subscribe(
      (response: any) => {
        this.usuarios = response.content;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error al obtener la lista de empleados', error);
      })
  }

  eliminarUsuario(id: number) {
    const usuarioAEliminar = this.usuarios.find(usuario => usuario.id === id);
    const title = this.translate.instant('swalSure');
    const text = this.translate.instant('swalEraseUser', { nickname: usuarioAEliminar?.nickname });
    const confirmButtonText = this.translate.instant('swalEraseConfirm');
    const cancelButtonText = this.translate.instant('swalEraseCancel');
    if (usuarioAEliminar) {
      Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText,
        cancelButtonText
      }).then((result) => {
        const title = this.translate.instant('swalEraseConfirmed');
        const text = this.translate.instant('swalEraseUserConfirmedMessage', { nickname: usuarioAEliminar?.nickname });
        const confirmButtonText = this.translate.instant('swalAccept');

        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe({
            next: () => {
              Swal.fire({
                title,
                text,
                icon: 'success',
                confirmButtonText
              });
              // Refrescar la lista de contactos después de eliminar
              this.obtenerUsuarios();
            },
            error: (error) => {
              const title = this.translate.instant('swalError');
              const text = this.translate.instant('swalErrorMessage');
              const confirmButtonText = this.translate.instant('swalAccept');

              Swal.fire({
                title,
                text,
                icon: 'error',
                confirmButtonText
              });
            }
          });
        }
      });
    } else {
      const title = this.translate.instant('swalError');
      const text = this.translate.instant('swalNotFoundMessage');
      const confirmButtonText = this.translate.instant('swalAccept');

      Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText
      });
    }
  }

  private traducirColumnas() {
    this.columnas = [
      { titulo: this.translate.instant('id'), campo: 'id' },
      { titulo: this.translate.instant('nickname'), campo: 'nickname' },
      { titulo: this.translate.instant ('roleName'), campo: 'nombreRol'},
      { titulo: this.translate.instant('registerDate'), campo: 'fechaRegistro' }
    ];
  }

  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.obtenerUsuarios();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.obtenerUsuarios();
    }
  }

  ordenarPor(campo: string) {
    this.sortField = campo;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.obtenerUsuarios();  // Volver a obtener empleados con la nueva ordenación
  }
}
