import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-actualizar-empleado',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent {
  id: number;
  empleado: Empleado = new Empleado();

  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.obtenerEmpleadoPorId(this.id).pipe(
      tap((datosActualizados: Empleado) => {
        this.empleado = datosActualizados;
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }

  navigateListaEmpleados() {
    this.router.navigate(['/empleados']);
    const title = this.translate.instant('swalEmployeeUpdated');
    const text = this.translate.instant('swalEmployeeUpdatedSuccess', { nombre: this.empleado.nombre, apellidos: this.empleado.apellidos });
    const confirmButtonText = this.translate.instant('swalAccept');
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText
    });
  }

  onSubmit(): void {
    if (this.empleado) {
      this.empleadoService.actualizarEmpleado(this.id, this.empleado).pipe(
        tap(() => {
          this.navigateListaEmpleados(); // Redirige en caso de éxito
        }),
        catchError(error => {
          return of(null); // Retorna un observable vacío en caso de error
        })
      ).subscribe();
    }
  }
}
