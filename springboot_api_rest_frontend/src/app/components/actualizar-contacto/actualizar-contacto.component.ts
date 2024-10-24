import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../model/contacto';
import { ContactoService } from '../../services/contacto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-contacto',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './actualizar-contacto.component.html',
  styleUrls: ['./actualizar-contacto.component.css']
})
export class ActualizarContactoComponent implements OnInit {
  id: number;
  contacto: Contacto = new Contacto();

  constructor(
    private readonly contactoService: ContactoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService // Inyecta TranslateService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.contactoService.obtenerContactoPorId(this.id).pipe(
      tap((datosActualizados: Contacto) => { // Asegúrate de tipar datosActualizados como Contacto
        this.contacto = datosActualizados;
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }

  // navigateListaContactos() {
  //   this.router.navigate(['/contactos']);
  //   Swal.fire({
  //       title: 'Contacto actualizado',
  //       text: `El contacto ${this.contacto.nombre} ${this.contacto.apellidos} ha sido actualizado con éxito`,
  //       icon: 'success',
  //       confirmButtonText: 'Aceptar'
  //   });
  // }
  navigateListaContactos() {
    this.router.navigate(['/contactos']);

    // Usa TranslateServce para obtener el texto traducido
    const title = this.translate.instant('swalContactUpdated');
    const text = this.translate.instant('swalContactUpdatedSuccess', { nombre: this.contacto.nombre, apellidos: this.contacto.apellidos });  // El contacto ha sido actualizado
    const confirmButtonText = this.translate.instant('swalAccept');

    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: confirmButtonText
    });
  }

  onSubmit(): void {
    if (this.contacto) {
      this.contactoService.actualizarContacto(this.id, this.contacto).pipe(
        tap(() => {
          this.navigateListaContactos(); // Redirige en caso de éxito
        }),
        catchError(error => {
          return of(null); // Retorna un observable vacío en caso de error
        })
      ).subscribe();
    }
  }
}
