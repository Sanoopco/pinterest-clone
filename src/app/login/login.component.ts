import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { PinterestserviceService } from '../services/pinterestservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data$:any
  constructor(private service:PinterestserviceService,private router:Router) {

  }
  loginForm=new FormGroup(
    {
      "username":new FormControl("",[Validators.required]),
      "password":new FormControl("",[Validators.required])
    }
  )
  get username(){
    return this.loginForm.get("username")
  }
  get password(){
    return this.loginForm.get("password")
  }

  handleLogin() {
    let data = this.loginForm.value;
    this.service.getToken(data).subscribe(
      (response)=>this.data$=response,
      (error)=>console.log(error)
    )
    let token = `Token ${this.data$.token}` ;  
    localStorage.setItem("token",token)
    this.router.navigate(['home'])
  }

}
