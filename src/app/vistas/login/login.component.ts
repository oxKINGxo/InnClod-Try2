import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/servicios/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email : string = '';
    username : string = '';

    errorStatus:boolean = false;
    errorMsj:any = "";

    ngOnInit(): void {
        this.checkLocalStorage();
    }

    checkLocalStorage(){
        if(localStorage.getItem('token')){
            this.router.navigate(['dashboard']);
        }
    }

    constructor(private api: ApiService, private router:Router){
    }

    async onLogin(){
        this.api.loginByEmail(this.email,this.username).subscribe(data =>{
            //let a = JSON.parse(data);
            try {
                let a = data[0];
                if(!a || Object.keys(a).length === 0){
                    this.errorStatus = true;
                    this.errorMsj = "Usuario o Contraseña Incorrecto";
                    console.log('error: data esta vacio');
                }else {
                    localStorage.setItem("token", a.address.zipcode);
                    this.router.navigate(['dashboard']);
                }
            }catch(err){
                console.error('error al parsear');
            }
        })
        
    }

}