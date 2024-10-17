import { Injectable } from '@angular/core';
import { loginI } from '../../modelos/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { proyectosI } from 'src/app/modelos/proyectos.interface';
import { proyectosCI } from 'src/app/modelos/proyectosComp.interface';
import { tareasI } from 'src/app/modelos/tareas.interface';
import { LoginComponent } from 'src/app/vistas/login/login.component';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://jsonplaceholder.typicode.com/users";
  urlT:string = "https://jsonplaceholder.typicode.com/todos";

  constructor(private http:HttpClient) { }

  loginByEmail(email:string,username:string):Observable<any>{
    return this.http.get(this.url + '?email=' + email + '&' + 'username=' + username);
  }

  getAllProyectos():Observable<proyectosI[]>{
    let direccion = this.url + '/';
    return this.http.get<proyectosI[]>(direccion);
  }

  getSingleProyect(id:any):Observable<proyectosI>{
    let direccion = this.url + '/' + id;
    return this.http.get<proyectosI>(direccion);
  }

  putProyect(form: Partial<proyectosCI>):Observable<any>{
    let direccion = this.url + "/" + form.id;
    return this.http.put(direccion, form);
  }

  postProyect(form: Partial<proyectosI>):Observable<any>{
    return this.http.post(this.url + "/",form);
  }

  deleteProyect(id:any):Observable<any>{
    return this.http.delete(this.url + '/' + id);
  }

  getAllTareas(id:any):Observable<any>{
    return this.http.get(this.urlT + '?userId=' + id);
  }

  deleteTarea(id:any):Observable<any>{
    return this.http.delete(this.url + '/' + id);
  }

  getSingleTarea(id:any):Observable<any>{
    return this.http.get(this.urlT + '/' + id);
  }

  putTarea(form:tareasI):Observable<any>{
    return this.http.put(this.urlT + "/" + form.id, form);
  }

  postTarea(form:Partial<tareasI>):Observable<any>{
    return this.http.post(this.urlT + "/",form);
  }

}
