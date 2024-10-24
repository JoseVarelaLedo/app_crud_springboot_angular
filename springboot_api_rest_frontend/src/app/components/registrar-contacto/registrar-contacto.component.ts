import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contacto } from '../../model/contacto';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-contacto',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule, TranslateModule ],
  templateUrl: './registrar-contacto.component.html',
  styleUrls: ['./registrar-contacto.component.css']
})
export class RegistrarContactoComponent implements OnInit{
  contacto: Contacto = {
    id: 0,         // Inicializa con valores por defecto
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
    fechaRegistro: new Date()
  };

  constructor ( private readonly contactoService : ContactoService,
    private readonly router : Router,
    private readonly translate: TranslateService ) { }

  ngOnInit(): void {
    //
  }

  guardarContacto(){
    this.contactoService.registrarContacto (this.contacto).subscribe(() =>{
      this.navigateListaContactos();
    }, error => console.log (error));
  }

  navigateListaContactos(){
    this.router.navigate(['/contactos']);
    const title = this.translate.instant('swalContactCreated');
    const text = this.translate.instant('swalContactCreatedMessage', { nombre: this.contacto.nombre, apellidos: this.contacto.apellidos });
    const confirmButtonText = this.translate.instant('swalAccept');
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText
  });
  }

  onSubmit() {
    this.guardarContacto();
  }
}
