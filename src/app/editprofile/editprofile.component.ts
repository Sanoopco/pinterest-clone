import { Component, Input, OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit{
  currentUser:any
  profilePicFile:any

  constructor(private service:PinterestserviceService) {

  }
  ngOnInit(): void {
    this.getUserInfo();
      
  }

  getUserInfo(){
    this.service.getCurrentUser().subscribe(
      (response)=>this.currentUser = response,
      (error)=>console.log(error)
    )
  }

 


}
