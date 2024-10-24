import { Empleado } from '../../model/empleado';
import { EmpleadoService } from './../../services/empleado.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent {
  empleado: Empleado = {
    id: 0,
    nombre: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    correoElectronico: '',
    esJefe: false,
    nickname: '',
    departamentoId : 0,
    nombreDepartamento: '',
    fechaNacimiento: new Date(),
    fechaRegistro: new Date()
  };

  constructor ( private readonly empleadoService : EmpleadoService,
    private readonly router : Router,
    private readonly translate: TranslateService ) { }

  ngOnInit(): void {
  }

  guardarEmpleado(){
    this.empleadoService.registrarEmpleado (this.empleado).subscribe(datosEmpleado =>{

      this.navigateListaEmpleados();
    }, error => console.log (error));
  }

  navigateListaEmpleados(){
    this.router.navigate(['/empleados']);
    const title = this.translate.instant('swalEmployeeCreated');
    const text = this.translate.instant('swalEmployeeCreatedMessage', { nombre: this.empleado.nombre, apellidos: this.empleado.apellidos });
    const confirmButtonText = this.translate.instant('swalAccept');
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText
  });
  }

  onSubmit() {
    this.guardarEmpleado();
  }
}
