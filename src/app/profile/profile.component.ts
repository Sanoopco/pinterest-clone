import { DOCUMENT } from '@angular/common';
import { Component,Inject,OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profilePic:any
  currentUser:any
  createdStatus:any
  savedStatus:any
  line:any
  myFollowers$: any;
  constructor(@Inject(DOCUMENT) private document:Document,private service:PinterestserviceService,private router:Router ){}

  ngOnInit(): void {
    this.savedStatus=true;
    this.createdStatus=false;
    this.getUserInfo()
    this.getMyFollowers()
  }

  handleButtonMoveToCreate(){
    let line = this.document.querySelector(".line");
    this.line=line
    this.line.animate(
          {
              transform:'translate(-50%)',
              width:'90px'
          },
          {
              duration:200,fill:"forwards"
  
          }
      )
  }


  handleButtonMoveToSaved(){
    let line = document.querySelector(".line");
    this.line=line
    this.line.animate(
      {
          transform:'translate(75%)',
          width:'70px'
      },
      {
          duration:200,fill:"forwards"

      }
  )
  }
  handleCreatedAndSaved(event:any) {
    if (event.target.value == "created"){
      this.savedStatus=false;
      this.createdStatus=true;
    }
    else{
      this.createdStatus=false;
      this.savedStatus=true;
      
    }
  }
  getUserInfo(){
    this.service.getCurrentUser().subscribe(
      (res)=>{
        this.currentUser = res;
        this.getProfilePic(res);
      },
      (error)=>console.log(error),      
    )
  }
  navigateToEditProfile() {
    this.router.navigateByUrl('settings/editprofile')
  }
  getProfilePic(user:any){
    this.service.getProfilePic(user.id).subscribe(
      (res)=>this.profilePic=res,
      (error)=>console.log(error)  
    )  
  }
  getMyFollowers(){
    this.service.getMyFollowers().subscribe(
      (res)=>this.myFollowers$ = res,
      (error)=>console.log(error)
      
    )
  }
}
