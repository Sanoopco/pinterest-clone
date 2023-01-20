import { Component,OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-pinlist',
  templateUrl: './pinlist.component.html',
  styleUrls: ['./pinlist.component.css']
})
export class PinlistComponent implements OnInit{
  pins:any
  random:any
  popUpMessage:any
  messageContent:any
  size:any=["card-small", "card-medium", "card-large"];
  constructor(private service:PinterestserviceService,private router:Router) {}
    ngOnInit(): void {
      this.service.getAllPins().then(res=>res.json()).then(data=>this.pins=data)
      this.popUpMessage= document.querySelector("#pop-up-message");
      this.messageContent = document.querySelector('.success-message')
      
    }
    redirectToPost(id:any) {
      this.router.navigate(["home/pin/",id])
    }
    
    randomSize(){
      let sizeArr = ["card-small", "card-medium", "card-large"];
      let randomSize = Math.floor(Math.random() * sizeArr.length);
      return sizeArr[randomSize]
    }
    addToSaved(id:any){
      this.service.savePost(id).then((res:any)=>res.json()).then(data=>{
        this.showPopUpMessage("added to saved")
      })
    }

    closePopUpMessage(){
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
