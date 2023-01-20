import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms'
import { PinterestserviceService } from '../services/pinterestservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private service:PinterestserviceService,private router:Router) {

  }
  registrationForm=new FormGroup(
    {
      "first_name":new FormControl("",[Validators.required]),
      "last_name":new FormControl("",[Validators.required]),
      "email":new FormControl("",[Validators.required,Validators.email]),
      "username":new FormControl("",[Validators.required]),
      "password":new FormControl("",[Validators.required]),
      
    }
  )
  get first_name() {
    return this.registrationForm.get("first_name")
  }
  get last_name() {
    return this.registrationForm.get("last_name")
  }
  get email() {
    return this.registrationForm.get("email")
  }
  get username() {
    return this.registrationForm.get("username")
  }
  get password() {
    return this.registrationForm.get("password")
  }

  handleRegistration() {
    let data=this.registrationForm.value
    this.service.userRegistration(data).then(res=>res.json()).then(data=>console.log(data))
    this.router.navigate(['login'])
  }
}
