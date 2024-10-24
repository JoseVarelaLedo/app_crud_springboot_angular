import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private readonly baseURL = "http://localhost:9666/empleados";


  constructor(private readonly httpClient: HttpClient) { }

  //método original sin paginación
  // obtenerListaDeEmpleados (): Observable <Empleado[]>{
  //   return this.httpClient.get<Empleado[]>(`${this.baseURL}`);
  // }
  // obtenerListaDeEmpleados(page: number, size: number): Observable<{ content: Empleado[], totalElements: number, totalPages: number }> {
  //   return this.httpClient.get<{ content: Empleado[], totalElements: number, totalPages: number }>(
  //     `http://localhost:9666/empleados?page=${page}&size=${size}`
  //   );
  // }
  obtenerListaDeEmpleados(page: number, size: number, sortField: string, sortDirection: string): Observable<Empleado> {
    return this.httpClient.get<Empleado>(`${this.baseURL}?pag=${page}&tam=${size}&campoOrdenacion=${sortField}&direccionOrdenacion=${sortDirection}`);
  }

  obtenerEmpleadoPorId (id:number) : Observable<Empleado>{
    return this.httpClient.get<Empleado> (`${this.baseURL}/${id}`);
  }

  registrarEmpleado (empleado:Empleado) : Observable<Empleado>{
    return this.httpClient.post<Empleado>(`${this.baseURL}`, empleado);
  }

  eliminarEmpleado (id:number) : Observable<Empleado>{
    return this.httpClient.delete <Empleado>(`${this.baseURL}/${id}`);
  }

  actualizarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.httpClient.put<Empleado>(`${this.baseURL}/${id}`, empleado);
  }
}
