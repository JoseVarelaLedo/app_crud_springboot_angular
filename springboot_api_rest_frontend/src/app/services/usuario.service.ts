import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly baseURL = "http://localhost:9666/usuarios";


  constructor(private readonly httpClient: HttpClient) { }

  obtenerListaDeUsuarios (page: number, size: number, sortField: string, sortDirection: string): Observable <Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}?pag=${page}&tam=${size}&campoOrdenacion=${sortField}&direccionOrdenacion=${sortDirection}`);
  }

  obtenerUsuarioPorId (id:number) : Observable<Usuario>{
    return this.httpClient.get<Usuario> (`${this.baseURL}/${id}`);
  }

  registrarUsuario (usuario:Usuario) : Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.baseURL}`, usuario);
  }

  eliminarUsuario (id:number) : Observable<Usuario>{
    return this.httpClient.delete <Usuario>(`${this.baseURL}/${id}`);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.baseURL}/${id}`, usuario);
  }
}
