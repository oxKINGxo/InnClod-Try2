import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { tareasI } from 'src/app/modelos/tareas.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboardt',
  templateUrl: './dashboardt.component.html',
  styleUrls: ['./dashboardt.component.css'],
  imports:[CommonModule, ReactiveFormsModule],
  standalone: true,
})

export class DashboardtComponent implements OnInit{

  tareas:tareasI[] = [];
  datosTareas!:tareasI;
  idEliminar:number|null = 0;
  
  editarform = new FormGroup({
    userId: new FormControl<number|null>(null),
    id: new FormControl<number|null>(null),
    title: new FormControl<string|null>(''),
    completed: new FormControl<boolean>(false)
  });

  nuevoform = new FormGroup({
    title: new FormControl<string|null>(''),
    completed: new FormControl<boolean>(false)
  });

  constructor(private router:Router, private alertas:AlertasService, private api:ApiService, private activerouter:ActivatedRoute){}

  ngOnInit(): void {
    let id = this.activerouter.snapshot.paramMap.get('id');
    this.api.getAllTareas(id).subscribe(data =>{
      this.tareas = data;
    })
  }

  //ELIMINAR TAREA
  selecionEliminar(id:number|any){
    this.idEliminar = id;
  }
  eliminar(){
    let idUS = this.activerouter.snapshot.paramMap.get('id');
    this.api.deleteTarea(this.idEliminar).subscribe({
      next: (data) =>{
        this.alertas.showSuccess('Datos borrados','Hecho');
        this.router.navigate(['dashboardT/', idUS]);
      },error:(error)=>{
        this.alertas.showError('Eliminacion fallida', 'error');
      }
    }) 
  }



  //EDITAR TAREA
  selecionEditar(id:number|any){
    this.api.getSingleTarea(id).subscribe(data =>{
      this.datosTareas = data;
      this.editarform.setValue({
        'userId': this.datosTareas.userId ??0,
        'id': this.datosTareas.id ??0,
        'title': this.datosTareas.title,
        'completed': this.datosTareas.completed
      });
    })
  }

  editarTarea(form:tareasI){
    this.api.putTarea(form).subscribe({
      next: (data) => {
        this.alertas.showSuccess('Datos modificados','Hecho');
      },error:(err) => {
        this.alertas.showError('Error al modificar los datos', 'Error');
      }
    });
  }



  //NUEVA TAREA
  postForm(form:tareasI){
    //console.log(form);
    this.api.postTarea(form).subscribe({
      next: (data) => {
        this.alertas.showSuccess('Datos Agregados','Hecho');
      },error:(err) => {
        this.alertas.showError('Error al agregar los datos', 'Error');
      }
    });
  }



  //salir de la aplicacion
  salir(){
    localStorage.clear();
    this.router.navigate(['login']);
  }



  //VOLVER
  volver(){
    this.router.navigate(['dashboard']);
  }
}
