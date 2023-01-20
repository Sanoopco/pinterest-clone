import { Component, Input, OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-changeprofilepic',
  templateUrl: './changeprofilepic.component.html',
  styleUrls: ['./changeprofilepic.component.css']
})
export class ChangeprofilepicComponent implements OnInit{
  currentUser:any
  profilePicFile$:any
  isProfilePic: any;
  
  @Input()
  userid:any

  constructor(private service:PinterestserviceService){}
  ngOnInit(): void {
      this.getUserInfo()
      this.service.profileRefresh.subscribe(
        (response)=>{
          this.getProfilePic(this.userid);
        }
      )
      this.getProfilePic(this.userid)
      this.isProfilePic=false
  }
  getUserInfo(){
    this.service.getCurrentUser().subscribe(
      (response)=>this.currentUser = response,
      (error)=>console.log(error)
    )
  }
  onChange(event:any,id:any){
    this.profilePicFile$ =  event.target.files[0]
    const formData = new FormData();
    formData.append('profile_pic',this.profilePicFile$)
    if (this.profilePicFile$ && id!=undefined){
      console.log("hekoek");  
      this.service.updateProfilePic(id,formData).subscribe(
        (event)=>{
          switch(event.type){
            case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
              console.log(event);
              break;
              case HttpEventType.Response:
                console.log(event);
                break;    
          }
        },
        (error)=>console.log(error),
        ()=>console.log("done updating profile pic")
      )
    }
    else{
      this.service.addProfilePic(formData).subscribe(
        (event)=>{
          switch(event.type){
            case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
              console.log(event);
              break;
            case HttpEventType.Response:
              console.log(event);
              break;   
          }
        },
        (error)=>console.log(error),
        ()=>console.log("done adding profile pic")
       )
    }
  }
  getProfilePic(id:any) {
    if (id){
      this.service.getProfilePic(id).subscribe(
        (res)=>this.profilePicFile$=res,
        (error)=>console.log(error)
        
      )
    }
  }
  removeProfilePic(id:any){
    this.service.removeProfilePic(id).subscribe(
      (res)=>console.log(res),
      (error)=>console.log(error),
      ()=>{
        this.isProfilePic=false
        console.log('pic removed')
      }     
    )
  }
}
