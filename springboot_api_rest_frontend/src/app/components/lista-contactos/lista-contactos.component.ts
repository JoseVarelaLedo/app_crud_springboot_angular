import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../model/contacto'
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService, LangChangeEvent  } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.css'],
})

export class ListaContactosComponent implements OnInit {
  contactos: Contacto[];
  page = 0;
  size = 7;
  totalElements = 0;
  totalPages = 0;
  sortField = 'id'; // Campo de ordenación por defecto
  sortDirection = 'asc'; // Dirección por defecto
  columnas: any[] = [];
  langChangeSubscription: Subscription;

  constructor(private readonly contactoService: ContactoService,
    private readonly router: Router,
    private readonly translate: TranslateService) { }

  ngOnInit(): void {
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.traducirColumnas();
    });
    this.traducirColumnas();
    this.obtenerContactos();
  }

  ngOnDestroy() {
    // Desuscribirse de los cambios de idioma cuando el componente se destruye
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private obtenerContactos() {
    this.contactoService.obtenerListaDeContactos(this.page, this.size, this.sortField, this.sortDirection).subscribe(
      (response: any) => {
        this.contactos = response.content;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error al obtener la lista de contactos', error);
      }
    );
  }

  actualizarContacto(id: number) {
    this.router.navigate(['/actualizar-contacto', id]);
    // Refrescar la lista de contactos después de eliminar
    this.obtenerContactos();
  }

  eliminarContacto(id: number) {
    const contactoAEliminar = this.contactos.find(contacto => contacto.id === id);
    const title = this.translate.instant('swalSure');  // 'Contacto actualizado'
    const text = this.translate.instant('swalEraseContact', { nombre: contactoAEliminar?.nombre, apellidos: contactoAEliminar?.apellidos });  // El contacto ha sido actualizado
    const confirmButtonText = this.translate.instant('swalEraseConfirm');
    const cancelButtonText = this.translate.instant('swalEraseCancel');
    if (contactoAEliminar) {
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
        const text = this.translate.instant('swalEraseContactConfirmedMessage', { nombre: contactoAEliminar?.nombre, apellidos: contactoAEliminar?.apellidos });
        const confirmButtonText = this.translate.instant('swalAccept');

        if (result.isConfirmed) {
          this.contactoService.eliminarContacto(id).subscribe({
            next: () => {
              Swal.fire({
                title,
                text,
                icon: 'success',
                confirmButtonText
              });
              // Refrescar la lista de contactos después de eliminar
              this.obtenerContactos();
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
      { titulo: this.translate.instant('name'), campo: 'nombre' },
      { titulo: this.translate.instant('surname'), campo: 'apellidos' },
      { titulo: this.translate.instant('phone'), campo: 'telefono' },
      { titulo: this.translate.instant('email'), campo: 'correoElectronico' },
      { titulo: this.translate.instant('address'), campo: 'direccion' },
      { titulo: this.translate.instant('registerDate'), campo: 'fechaRegistro' }
    ];
  }

  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.obtenerContactos();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.obtenerContactos();
    }
  }

  ordenarPor(campo: string) {
    this.sortField = campo;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.obtenerContactos();  // Volver a obtener empleados con la nueva ordenación
  }

}
