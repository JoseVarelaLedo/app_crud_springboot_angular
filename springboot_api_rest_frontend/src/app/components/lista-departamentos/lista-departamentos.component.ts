import { Component } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../model/departamento';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService, LangChangeEvent  } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Jefe } from '../../model/jefe';

@Component({
  selector: 'app-lista-departamentos',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.css']
})
export class ListaDepartamentosComponent {
  departamentos: Departamento[];
  page = 0;
  size = 7;
  totalElements = 0;
  totalPages = 0;
  sortField = 'id'; // Campo de ordenación por defecto
  sortDirection = 'asc'; // Dirección por defecto
  jefe: any;
  jefes: { [key: number]: Jefe } = {}; // Almacena los jefes por ID de departamento
  columnas: any[] = [];
  langChangeSubscription: Subscription;


  constructor(
    private readonly departamentoService: DepartamentoService,
    private readonly router: Router,
    private readonly translate: TranslateService) { }

  ngOnInit(): void {
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.traducirColumnas();
    });
    this.traducirColumnas();
    this.obtenerDepartamentos();
  }

  ngOnDestroy() {
    // Desuscribirse de los cambios de idioma cuando el componente se destruye
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private obtenerJefesDepartmentos() {
    this.departamentos.forEach(departamento => {
      this.departamentoService.obtenerJefePorDepartamento(departamento.id).subscribe(jefe => {
        this.jefes[departamento.id] = jefe; // Almacena el jefe en el objeto
      });
    });
  }

  private obtenerDepartamentos() {
    this.departamentoService.obtenerListaDeDepartamentos(this.page, this.size, this.sortField, this.sortDirection).subscribe(
      (response: any) => {
        this.departamentos = response.content;
        this.totalPages = response.totalPages;
        this.obtenerJefesDepartmentos();
      },
      (error) => {
        console.error('Error al obtener la lista de contactos', error);
      }
    );
  }


  actualizarDepartamento(id: number) {
    this.router.navigate(['/actualizar-departamento', id]);
    // Refrescar la lista de departamentos después de eliminar
    this.obtenerDepartamentos();
  }

  eliminarDepartamento(id: number) {
    const departamentoAEliminar = this.departamentos.find(departamento => departamento.id === id);
    const title = this.translate.instant('swalSure');
    const text = this.translate.instant('swalEraseDepartment', { nombreDepartamento: departamentoAEliminar?.nombreDepartamento });
    const confirmButtonText = this.translate.instant('swalEraseConfirm');
    const cancelButtonText = this.translate.instant('swalEraseCancel');

    if (departamentoAEliminar) {
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
        const text = this.translate.instant('swalEraseDepartmentConfirmedMessage', { nombreDepartamento: departamentoAEliminar?.nombreDepartamento });
        const confirmButtonText = this.translate.instant('swalAccept');

        if (result.isConfirmed) {
          this.departamentoService.eliminarDepartamento(id).subscribe({
            next: () => {
              Swal.fire({
                title,
                text,
                icon: 'success',
                confirmButtonText
              });
              // Refrescar la lista de contactos después de eliminar
              this.obtenerDepartamentos();
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
      { titulo: this.translate.instant('departmentName'), campo: 'nombreDepartamento' },
      { titulo: this.translate.instant('departmentBoss'), campo: '' },
      { titulo: this.translate.instant('registerDate'), campo: 'fechaRegistro' }
    ];
  }

  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.obtenerDepartamentos();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.obtenerDepartamentos();
    }
  }

  ordenarPor(campo: string) {
    this.sortField = campo;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.obtenerDepartamentos();  // Volver a obtener empleados con la nueva ordenación
  }
}
