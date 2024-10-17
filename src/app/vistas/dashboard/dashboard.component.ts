import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { proyectosCI } from 'src/app/modelos/proyectosComp.interface';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { proyectosI } from 'src/app/modelos/proyectos.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[CommonModule, ReactiveFormsModule],
  standalone: true
})
export class DashboardComponent implements OnInit{

  @ViewChild('eliminarModal') eliminarModal!: ElementRef;
  proyectos:proyectosI[] = [];
  idEliminar:number|null = 0;

  constructor(private activerouter:ActivatedRoute,private api:ApiService, private router:Router, private alertas:AlertasService){}

  proyectoSeleccionado: any;
  datosProyecto!:proyectosI;
  datosProyectoPut!:proyectosCI;
  editarform = new FormGroup({
    id: new FormControl<number|null|undefined>(null),
    company: new FormGroup({
      name: new FormControl(''),
      catchPhrase: new FormControl(''),
    })
  });
  nuevoform = new FormGroup({
    company: new FormGroup({
      name: new FormControl(''),
      catchPhrase: new FormControl(''),
    })
  });



  ngOnInit(): void {
    this.api.getAllProyectos().subscribe(data =>{
      this.proyectos = data;
      //console.log(data)
    })
    this.nuevoform.setValue({
      'company': ({
        'name': this.datosProyecto.company.name,
        'catchPhrase': this.datosProyecto.company.catchPhrase,
      })
    });
  }



  //EDITAR PROYECTO
  selecionEditar(id:number|any){
    this.api.getSingleProyect(id).subscribe(data =>{
      this.datosProyecto = data;
      {this.editarform.setValue({
        'id': this.datosProyecto.id ??0,
        'company': ({
          'name': this.datosProyecto.company.name,
          'catchPhrase': this.datosProyecto.company.catchPhrase,
        })
      });}
    })
  }
  editarProyecto(){
    //this.router.navigate(['editar', id]);
    const updatedCompany = this.editarform.value.company;

    if (updatedCompany) {
      const updatePayload = {
        id: this.editarform.value.id,
        company: {
          name: updatedCompany.name ?? '',
          catchPhrase: updatedCompany.catchPhrase ?? ''
        }
      };
      this.api.putProyect(updatePayload).subscribe(data => {
        this.alertas.showSuccess('Datos modificados','Hecho');
      });
    }else {
      this.alertas.showError('Modificacion fallida', 'error');
    }
    
  }


  
  // NUEVO PROYECTO
  nuevoProyecto(){
    const nuevoCompany = this.nuevoform.value.company;
    if (nuevoCompany) {
      const updatePayload = {
          company: {
              name: nuevoCompany.name ?? '',
              catchPhrase: nuevoCompany.catchPhrase ?? ''
          }
      };
      this.api.postProyect(updatePayload).subscribe(data => {
          this.alertas.showSuccess('Datos Agregados','Hecho');
      });
    }else {
      this.alertas.showError('Accion fallida', 'error');
    }
  }


  //ELIMINAR PROYECTO
  selecionEliminar(id:number|any){
    this.idEliminar = id;
  }
  eliminar(){
    this.api.deleteProyect(this.idEliminar).subscribe({
      next: (data) =>{
        this.alertas.showSuccess('Datos borrados','Hecho');
        this.router.navigate(['dashboard']);
      },error:(error)=>{
        this.alertas.showError('Eliminacion fallida', 'error');
      }
    }) 
  }



  //LISTA TAREAS
  abrirTareas(id:any){
    this.router.navigate(['dashboardT/', id]);
  }


  //salir de la aplicacion
  salir(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
