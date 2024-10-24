import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService, LangChangeEvent  } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  empleados: Empleado[];
  page = 0;
  size = 7;
  totalElements = 0;
  totalPages = 0;
  sortField = 'id'; // Campo de ordenación por defecto
  sortDirection = 'asc'; // Dirección por defecto
  columnas: any[] = [];
  langChangeSubscription: Subscription;

  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly router: Router,
    private readonly translate: TranslateService,
    ) { }

  ngOnInit() {
     // Suscribirse a los cambios de idioma
     this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.traducirColumnas();
    });
    this.traducirColumnas();
    this.obtenerEmpleados();
  }

  ngOnDestroy() {
    // Desuscribirse de los cambios de idioma cuando el componente se destruye
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  //método funcional antes de paginación
  // private obtenerEmpleados(){
  //   this.empleadoService.obtenerListaDeEmpleados().subscribe(datosEmpleado=>{this.empleados = datosEmpleado});
  // }
  // private obtenerEmpleados() {
  //   this.empleadoService.obtenerListaDeEmpleados(this.page, this.size).subscribe(response => {
  //     this.empleados = response.content;  // Lista de empleados paginados
  //     this.totalElements = response.totalElements;  // Número total de empleados
  //     this.totalPages = response.totalPages;  // Total de páginas
  //   });
  // }

  private obtenerEmpleados() {
    this.empleadoService.obtenerListaDeEmpleados(this.page, this.size, this.sortField, this.sortDirection).subscribe(
      (response: any) => {
        this.empleados = response.content;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error al obtener la lista de empleados', error);
      }
    );
  }

  actualizarEmpleado(id: number) {
    this.router.navigate(['/actualizar-empleado', id]);
    // Para refrescar la lista de contactos después de eliminar
    this.obtenerEmpleados();
  }

  eliminarEmpleado(id: number) {
    const empleadoAEliminar = this.empleados.find(empleado => empleado.id === id);
    const title = this.translate.instant('swalSure');
    const text = this.translate.instant('swalEraseEmployee', { nombre: empleadoAEliminar?.nombre, apellidos: empleadoAEliminar?.apellidos });
    const confirmButtonText = this.translate.instant('swalEraseConfirm');
    const cancelButtonText = this.translate.instant('swalEraseCancel');

    if (empleadoAEliminar) {
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
        const text = this.translate.instant('swalEraseEmployeeConfirmedMessage', { nombre: empleadoAEliminar?.nombre, apellidos: empleadoAEliminar?.apellidos });
        const confirmButtonText = this.translate.instant('swalAccept');
        if (result.isConfirmed) {
          this.empleadoService.eliminarEmpleado(id).subscribe({
            next: () => {
              Swal.fire({
                title,
                text,
                icon: 'success',
                confirmButtonText
              });
              // Refrescar la lista de contactos después de eliminar
              this.obtenerEmpleados();
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
      { titulo: this.translate.instant('departmentName'), campo: 'departamentoId' },
      { titulo: this.translate.instant('status'), campo: 'esJefe' },
      { titulo: this.translate.instant('nickname'), campo: 'nickname' },
      { titulo: this.translate.instant('birthDate'), campo: 'fechaNacimiento' },
      { titulo: this.translate.instant('registerDate'), campo: 'fechaRegistro' }
    ];
  }

  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.obtenerEmpleados();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.obtenerEmpleados();
    }
  }

  ordenarPor(campo: string) {
    this.sortField = campo;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.obtenerEmpleados();  // Volver a obtener empleados con la nueva ordenación
  }
}
