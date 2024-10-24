import { Departamento } from '../../model/departamento';
import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-departmento',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './actualizar-departamento.component.html',
  styleUrls: ['./actualizar-departamento.component.css']
})
export class ActualizarDepartamentoComponent implements OnInit{
  id: number;
  departamento: Departamento = new Departamento();

  constructor(
    private readonly departamentoService: DepartamentoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.departamentoService.obtenerDepartamentoPorId(this.id).pipe(
      tap((datosActualizados: Departamento) => { // Asegúrate de tipar datosActualizados como Contacto
        this.departamento = datosActualizados;
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }

  navigateListaDepartamentos() {
    this.router.navigate(['/departamentos']);
    const title = this.translate.instant('swalDepartmentUpdated');  // 'Departamento actualizado'
    const text = this.translate.instant('swalDepartmentUpdatedSuccess', { nombreDepartamento: this.departamento.nombreDepartamento });  // El departamento ha sido actualizado
    const confirmButtonText = this.translate.instant('swalAccept');  // 'Aceptar'
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText
    });
  }

  onSubmit(): void {
    if (this.departamento) {
      this.departamentoService.actualizarDepartamento(this.id, this.departamento).pipe(
        tap(() => {
          this.navigateListaDepartamentos(); // Redirige en caso de éxito
        }),
        catchError(error => {
          console.error('Error al actualizar el departamento:', error);
          return of(null); // Retorna un observable vacío en caso de error
        })
      ).subscribe();
    }
  }
}

