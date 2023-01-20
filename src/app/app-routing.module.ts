import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PinlistComponent } from './pinlist/pinlist.component';
import { AddpostComponent } from './addpost/addpost.component';
import { ProfileComponent } from './profile/profile.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { RegistrationComponent } from './registration/registration.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"home",component:PinlistComponent},
  {path:"createpost",component:AddpostComponent},
  {path:"myaccount",component:ProfileComponent},
  {path:"home/pin/:pin_id",component:PostdetailComponent},
  {path:"register",component:RegistrationComponent},
  {path:"settings/editprofile",component:EditprofileComponent},
  {path:'user/:user_id',component:UserprofileComponent},
  {path:'',component:AboutComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
