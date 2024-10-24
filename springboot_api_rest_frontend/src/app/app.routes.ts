//template original
// import { Routes } from '@angular/router';

// export const routes: Routes = [];

//v1
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaContactosComponent } from './components/lista-contactos/lista-contactos.component';
import { ListaDepartamentosComponent } from './components/lista-departamentos/lista-departamentos.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { RegistrarContactoComponent } from './components/registrar-contacto/registrar-contacto.component';
import { RegistrarDepartamentoComponent } from './components/registrar-departamento/registrar-departamento.component';
import { RegistrarEmpleadoComponent } from './components/registrar-empleado/registrar-empleado.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { ActualizarContactoComponent } from './components/actualizar-contacto/actualizar-contacto.component';

import { ActualizarDepartamentoComponent } from './components/actualizar-departamento/actualizar-departamento.component';
import { ActualizarEmpleadoComponent } from './components/actualizar-empleado/actualizar-empleado.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';


export const routes: Routes = [
  { path: '', redirectTo: '/contactos', pathMatch: 'full' },   // Redirección a contactos por defecto
  { path: 'contactos', component: ListaContactosComponent },   // Ruta para listar contactos
  { path: 'departamentos', component: ListaDepartamentosComponent },   // Ruta para listar departamentos
  { path: 'empleados', component: ListaEmpleadosComponent },   // Ruta para listar empleados
  { path: 'usuarios', component: ListaUsuariosComponent },   // Ruta para listar usuarios
  { path: 'registrar-contacto', component: RegistrarContactoComponent },   // Ruta para registrar contactos
  { path: 'registrar-departamento', component: RegistrarDepartamentoComponent },   // Ruta para registrar departamentos
  { path: 'registrar-empleado', component: RegistrarEmpleadoComponent },   // Ruta para registrar empleados
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },   // Ruta para registrar usuarios
  { path: 'actualizar-contacto/:id', component: ActualizarContactoComponent },   // Ruta para actualizar contactos
  { path: 'actualizar-departamento/:id', component: ActualizarDepartamentoComponent },   // Ruta para actualizar departamentos
  { path: 'actualizar-empleado/:id', component: ActualizarEmpleadoComponent },   // Ruta para actualizar empleados
  { path: 'actualizar-usurio/:id', component: ActualizarUsuarioComponent },   // Ruta para actualizar usuarios
  { path: '**', redirectTo: '' }   // Redirección para rutas no encontradas (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

