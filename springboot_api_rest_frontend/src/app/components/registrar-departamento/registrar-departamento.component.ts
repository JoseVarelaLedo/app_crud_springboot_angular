import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../model/departamento';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento.service';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-departamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './registrar-departamento.component.html',
  styleUrls: ['./registrar-departamento.component.css']
})
export class RegistrarDepartamentoComponent {
  departamento: Departamento = {
    id: 0,         // Inicializa con valores por defecto
    nombreDepartamento: '',
    fechaRegistro: new Date()
  };

  constructor ( private readonly departamentoService : DepartamentoService,
     private readonly router : Router,
     private readonly translate: TranslateService ) { }

  ngOnInit(): void {
    //
  }

  guardarDepartamento(){
    this.departamentoService.registrarDepartamento (this.departamento).subscribe(() =>{
      this.navigateListaDepartamentos();
    }, error => console.log (error));
  }

  navigateListaDepartamentos(){
    this.router.navigate(['/departamentos']);
    const title = this.translate.instant('swalDepartmenteCreated');
    const text = this.translate.instant('swalDepartmentCreatedMessage', { nombreDepartamento: this.departamento.nombreDepartamento});
    const confirmButtonText = this.translate.instant('swalAccept');
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText
  });
  }

  onSubmit() {
    this.guardarDepartamento();
  }
}
