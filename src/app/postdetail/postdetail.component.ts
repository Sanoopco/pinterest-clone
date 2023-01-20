import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PinterestserviceService } from "../services/pinterestservice.service";
@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit{
  pin:any
  fullViewContainer:any
  collapseContainer:any

    constructor(private service:PinterestserviceService,private router:ActivatedRoute,private routernext:Router){

    }
    ngOnInit(): void {
      this.fullViewContainer=document.querySelector("#id_img_fullview_container");
      this.collapseContainer=document.querySelector("#id_collapse_container");
      let pinId = this.router.snapshot.params['pin_id']
      // let pinId=1
      this.service.getPinById(pinId).then((res:any)=>res.json()).then(data=>this.pin=data)
      
    }
    addToSaved(id:any){
      this.service.savePost(id).then((res:any)=>res.json()).then(data=>console.log(data))
    }

    openFullView() {
      let fullviewContainer = document.querySelector("#id_img_fullview_container");
      this.fullViewContainer.classList.add("fullview-open");
    }
    closeFullView() {
      this.fullViewContainer.classList.remove("fullview-open");
    }
    collapse(){
      this.collapseContainer.classList.toggle("collapse-close");
    }
    redirectToUser(id:any) {
      this.routernext.navigate(["user/",id])
    }
    follow(userId:any){
      this.service.follow(userId).subscribe(
        (res)=>console.log(res),
        (error)=>console.log(error)
      )
    }
}


