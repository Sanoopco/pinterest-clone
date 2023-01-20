import { Component, OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';

@Component({
  selector: 'app-mycreatedposts',
  templateUrl: './mycreatedposts.component.html',
  styleUrls: ['./mycreatedposts.component.css']
})
export class MycreatedpostsComponent implements OnInit{
  myCreatedPosts:any
  deleteContainer:any
  popUpMessage:any
  messageContent:any
  constructor(private service:PinterestserviceService) {

  }
  ngOnInit(): void {
      this.getMyPosts();
      this.service.postRefreshRequired.subscribe(
        (res)=>{
          this.getMyPosts();
        }
      )
      this.popUpMessage= document.querySelector("#pop-up-message");
    this.messageContent = document.querySelector('.success-message')
  }
  getMyPosts() {
    this.service.getMyPosts().subscribe(
      (response)=>this.myCreatedPosts=response,
      (error)=>console.log(error),
      ()=>console.log('done collecting createdposts')
    )
  }
  handleDelete(myPostId:any){
    this.deleteContainer = document.querySelector(`#id_delete_container-for-my-posts${myPostId}`)
    this.deleteContainer.classList.toggle("close")
  }
  removeMyPost(id:any){
    this.service.deleteMyPost(id).subscribe(
      (res)=>console.log(res),
      (error)=>console.log(error),
      ()=>this.showPopUpMessage("successfully removed pin you created")
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

}

