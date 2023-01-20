import { Component, Input, OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';

@Component({
  selector: 'app-allreplys',
  templateUrl: './allreplys.component.html',
  styleUrls: ['./allreplys.component.css']
})
export class AllreplysComponent implements OnInit{
  @Input()
  comment_id:any
  replyComments$:any
  currentUser:any
  deleteBtn:any
  constructor(private service:PinterestserviceService) {}
  ngOnInit(): void {
      this.getAllReplys()
      this.service.refreshrequired.subscribe(
        (response)=>{
          this.getAllReplys();
        }
      )
      this.getCurrentUser()
  }
  getAllReplys(){
    this.service.getAllReplyOfComment(this.comment_id).subscribe(
      (res)=>this.replyComments$=res,
      (error)=>console.log(error),
      ()=>console.log("done collecting replys")
      )
  }
  
  addLike(event:any,id:any){
    event.target.style.color="#e60024";
    this.service.addLikeToReply(id).subscribe(
      (response)=>console.log(response),
      (error)=>console.log(error)
    )
  }
  getCurrentUser(){
    this.service.getCurrentUser().subscribe(
      (res)=>this.currentUser=res,
      (error)=>console.log(error)          
    )
  }
  handleDeleteReply(currentUser:any,replyUser:any,replyId:any) {
    console.log(replyUser,currentUser);
    
    if (currentUser!=replyUser){      
    }
    else{
      this.deleteBtn=document.querySelector(`#replyDeleteBtn${replyId}`)
      this.deleteBtn.classList.toggle("active")
    }
  }

  removeReply(id:any){
    this.service.removeReply(id).subscribe(
      (res)=>console.log(res),
      (error)=>console.log(error)     
    )
  }
}
