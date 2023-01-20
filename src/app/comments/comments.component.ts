import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddreplyComponent } from "../addreply/addreply.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{ 

  @Input() pin_id:any
  addReplyContainer:any
  comments$:any
  collapseContainer:any
  currentUser:any
  likeIcon:any
  deleteBtn:any
  constructor(private service:PinterestserviceService,private http:HttpClient) {}
  ngOnInit(): void {
      this.getCurrentUser()
      this.collapseContainer = document.querySelector("#id_collapse_container");
      this.onGetComments();  
      this.service.refreshrequired.subscribe(
        (response)=>{
          this.onGetComments();
        }
      )
      this.handleLikeColor()
  }

  collapse() {
    this.collapseContainer.classList.toggle("collapse-close");
  }

  onGetComments():void {    
    this.service.getComments(this.pin_id).subscribe(
      (response)=>this.comments$=response,
      (error)=>console.log(error),
      ()=>console.log("done")
    )
  }

  addLike(event:any,id:any){
    event.target.style.color="#e60024";
    this.service.addLikeToComment(id).subscribe(
      (res)=>console.log(res),
      (error)=>console.log(error) ,
      ()=>console.log("done adding like")
      
    )
  }
  getCurrentUser(){
    this.service.getCurrentUser().subscribe(
      (res)=>this.currentUser=res,
      (error)=>console.log(error)          
    )
  }

  removeComment(id:any){
    this.service.removeComment(id).subscribe(
      (response)=>console.log(response),
      (error)=>console.log(error)  
    )
  }
  handleDeleteComment(currentUser:any,commentUser:any,commentId:any) {
    if (currentUser!=commentUser){      
    }
    else{
      this.deleteBtn=document.querySelector(`#deleteBtn${commentId}`)
      this.deleteBtn.classList.toggle("active")
    }
  }
  onReplyBtnClicked(comment_id:any){
    this.addReplyContainer=document.querySelector(`#id_main_add_reply_container${comment_id}`);
    this.addReplyContainer.classList.toggle("replyactive")
    
    if (this.addReplyContainer.dataset.status=="active"){
      this.addReplyContainer.dataset.status="inactive";
    }
    else{
      this.addReplyContainer.dataset.status="active";
    }
  }
  
  replyForm=new FormGroup(
    {
      "reply":new FormControl("",[Validators.required])
    }
  )
  addReply(comment_id:any){
    this.service.replyComment(this.replyForm.value,comment_id).subscribe(
      (res)=>console.log(res),
      (error)=>console.log(error)
      
    )
  }

  handleLikeColor(){
    this.comments$.forEach((comment:any) => {
      if (this.currentUser.id in comment.like) {
        console.log("hellooo");
        
      }
    });
  }
  showlike(cuser:any,like:any){
    for (let i = 0; i < like.length; i++) {
      const element = like[i];
      console.log(element,cuser);
      
    }
  }
}   
