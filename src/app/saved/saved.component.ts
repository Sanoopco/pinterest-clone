import { Component, OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit{
  savedPosts$:any
  deletecontainer:any
  popUpMessage:any
  messageContent:any
  currentUser: any;
  constructor(private service:PinterestserviceService,private router:Router){}
  ngOnInit(): void {
    this.getCurrentUser()
    this.getSavedPosts()
    this.service.refreshrequired.subscribe(
      (response)=>{
        this.getSavedPosts();
      }
    )
    this.popUpMessage= document.querySelector("#pop-up-message");
    this.messageContent = document.querySelector('.success-message');
  }
  getSavedPosts(){
    this.service.getSavedPosts().subscribe(
      (res)=>this.savedPosts$=res,
      (error)=>console.log(error),
      ()=>console.log("done getting saved posts")  
    )
  }
  redirectToPost(id:any) {
    this.router.navigate(["home/pin/",id])
  }
  handleDelete(savedPostId:any){
    this.deletecontainer = document.querySelector(`#id_delete_container${savedPostId}`)
    this.deletecontainer.classList.toggle("close")
  }
  removeSavedPost(id:any){
    this.service.removeSavedPost(id).subscribe(
      (res)=>console.log(res),
      (error)=>console.log(error),
      ()=>this.showPopUpMessage("succesfully removed from saved")
    )
  }
  closePopUpMessage(){
    console.log("kllkllk"); 
    this.popUpMessage.classList.remove("active");
    
  }
  showPopUpMessage(message:any){
    this.popUpMessage.classList.add('active')
    this.messageContent.innerHTML=message
    setTimeout(() => {
      this.popUpMessage.classList.remove('active')
    }, 2000);
    
  }
  getCurrentUser(){
    this.service.getCurrentUser().subscribe(
      (res)=>this.currentUser = res,
      (error)=>console.log(error)
      
    )
  }
}                                                        
