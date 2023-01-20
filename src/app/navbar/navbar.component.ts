import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PinterestserviceService } from '../services/pinterestservice.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  sideMenu:any
  notificationMenu:any
  profilePic:any
  messageMenu:any
  currentUser:any
  currentUserInfo$:any
  constructor(private router:Router,private service:PinterestserviceService){}
  ngOnInit(): void {
    this.sideMenu=document.querySelector("#side-menu");
    this.notificationMenu=document.querySelector("#notification-side-menu");
    this.messageMenu=document.querySelector("#message-side-menu");
    // this.checkUserIsLoged()
    this.getUserInfo()
    this.service.profileRefresh.subscribe(
      (res)=>this.getUserInfo()
    )
    this.service.tokenRefresh.subscribe(
      (res)=>this.getUserInfo()
    )
    this.currentUser = localStorage.getItem('token')?true:false;
  }
  handleSideMenu(){
    if (this.notificationMenu.dataset.status=="active" || this.messageMenu.dataset.status=="active"){
      this.notificationMenu.dataset.status='inactive';
      this.messageMenu.dataset.status="inactive";
  }
  if (this.sideMenu.dataset.status=="inactive") {
      this.sideMenu.dataset.status="active"
  }
  else{
      this.sideMenu.dataset.status="inactive"
  }
  }

  handleNotificationMenu() {
    if (this.sideMenu.dataset.status=="active" || this.messageMenu.dataset.status == "active"){
      this.sideMenu.dataset.status='inactive';
      this.messageMenu.dataset.status = "inactive";
  }
  
  if (this.notificationMenu.dataset.status=="inactive"){
      this.notificationMenu.dataset.status="active";
      
  }
  else{
      this.notificationMenu.dataset.status="inactive"
  }
  }

  handleMessageMenu(){
    if (this.sideMenu.dataset.status=="active" || this.notificationMenu.dataset.status=="active"){
      this.sideMenu.dataset.status='inactive';
      this.notificationMenu.dataset.status = 'inactive';
  }
  if (this.messageMenu.dataset.status=="inactive"){
      this.messageMenu.dataset.status="active";
      
  }
  else{
      this.messageMenu.dataset.status="inactive"
  }
  }
  // checkUserIsLoged(){
  //   let tkn = localStorage.getItem('token');
    
  //   if (tkn){
  //     this.currentUser=true;
  //     console.log("logged in");
  //   }
  //   else{
  //     this.currentUser=false;
  //     console.log("user is not logged in");
  //   }
  // }

  logout() {
    localStorage.removeItem("token");
    this.currentUser=false;
    this.sideMenu.dataset.status="inactive"
    this.router.navigateByUrl('')
  }
  getUserInfo(){
    this.service.getCurrentUser().subscribe(
      (res)=>{
        this.currentUserInfo$ = res;
        this.getProfilePic(res)
      },
      (error)=>console.log(error)
      
    )
  }
  getProfilePic(user:any){
    this.service.getProfilePic(user.id).subscribe(
      (res)=>this.profilePic=res,
      (error)=>console.log(error)  
    )  
  }
  navigateToProfile(){
    this.router.navigate(['myaccount'])
  }
}
