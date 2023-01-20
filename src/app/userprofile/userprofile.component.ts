import { Component, Inject } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  profilePic:any
  user:any
  createdStatus:any
  savedStatus:any
  line:any
  myFollowers$:any
  constructor(@Inject(DOCUMENT) private document:Document,private service:PinterestserviceService,private router:Router,private routerForUser:ActivatedRoute ){}

  ngOnInit(): void {
    this.savedStatus=true;
    this.createdStatus=false;
    let userId = this.routerForUser.snapshot.params["user_id"]
    this.getProfilePic(userId);
    this.getUserById(userId);
    this.getFollowersById(userId)
    this.service.followRefresh.subscribe(
      ()=>this.getFollowersById(userId)
    )

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
  
  getProfilePic(user:any){
    this.service.getProfilePic(user).subscribe(
      (res)=>this.profilePic=res,
      (error)=>console.log(error)  
    )  
  }

  getUserById(id:any){
    this.service.getUserById(id).subscribe(
      (res)=>this.user=res,
      (error)=>console.log(error)
      
    )
  }
  follow(userId:any){
    this.service.follow(userId).subscribe(
      (res)=>console.log(res),
      (error)=>console.log(error)
    )
  }
  getFollowersById(id:any){
    this.service.getFollowersById(id).subscribe(
      (res)=>this.myFollowers$=res,
      (error)=>console.log(error)  
    )
  }
}
