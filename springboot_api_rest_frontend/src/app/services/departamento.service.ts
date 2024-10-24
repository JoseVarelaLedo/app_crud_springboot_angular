import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../model/departamento';
import { Jefe } from '../model/jefe';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly baseURL = "http://localhost:9666/departamentos";


  constructor(private readonly httpClient: HttpClient) { }

  obtenerListaDeDepartamentos (page: number, size: number, sortField: string, sortDirection: string): Observable <Departamento[]>{
    return this.httpClient.get<Departamento[]>(`${this.baseURL}?pag=${page}&tam=${size}&campoOrdenacion=${sortField}&direccionOrdenacion=${sortDirection}`);
  }

  obtenerDepartamentoPorId (id:number) : Observable<Departamento>{
    return this.httpClient.get<Departamento> (`${this.baseURL}/${id}`);
  }
  obtenerJefePorDepartamento(departamentoId: number): Observable<Jefe> {
    return this.httpClient.get<Jefe>(`http://localhost:9666/empleados/jefe-departamento/${departamentoId}`);
  }

  registrarDepartamento (departamento:Departamento) : Observable<Departamento>{
    return this.httpClient.post<Departamento>(`${this.baseURL}`, departamento);
  }

  eliminarDepartamento (id:number) : Observable<Departamento>{
    return this.httpClient.delete <Departamento>(`${this.baseURL}/${id}`);
  }

  actualizarDepartamento(id: number, departamento: Departamento): Observable<Departamento> {
    return this.httpClient.put<Departamento>(`${this.baseURL}/${id}`, departamento);
  }
}
