import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { PinterestserviceService } from '../services/pinterestservice.service';
@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit{
  @Input()
  pin_id:any
  constructor(private service:PinterestserviceService){

  }
  ngOnInit(): void {
      
  }
  commentForm=new FormGroup(
    {
      comment: new FormControl('',[Validators.required])
    }
  )
  get comment() {
    return this.commentForm.get("comment")
  }
  handleComment():void {
    this.service.addComment(this.commentForm.value,this.pin_id).subscribe(
      (res)=>console.log(res),
      (error:any)=>console.log(error),
      ()=>console.log("done")
    )
  }
}
