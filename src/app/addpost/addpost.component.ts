import { Component,OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';
import { FormBuilder,FormGroup,FormControl, Validators } from "@angular/forms";
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  form!: FormGroup;
  title:any
  descriptions:any
  destination:any
  popUpMessage:any
  messageContent:any
  absoluteImgContainer:any
  constructor(private service:PinterestserviceService,private formBuilder:FormBuilder) {

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      imageofPost: ['']
    });
    this.absoluteImgContainer=document.querySelector(".absolute-img-container")
    this.title=this.postForm.get('post_title')
    this.descriptions = this.postForm.get('description')
    this.destination = this.postForm.get('destination_link')
    this.popUpMessage= document.querySelector("#pop-up-message");
    this.messageContent = document.querySelector('.success-message')
    }

  postForm=new FormGroup(
    { 
      
      "post_title":new FormControl("",[Validators.required]),
      "description":new FormControl("",[Validators.required]),
      "destination_link":new FormControl(""),

    }
  )
  // get post_title() {
  //   return this.postForm.get("post_title")
  // }  
  // get description() {
  //   return this.postForm.get("description")
  // }
  // get destination_link() {
  //   return this.postForm.get("destination_link")
  // }
  onChange(event:any) {
     const file=event.target.files[0]
     console.log(event.target.value);
     this.showImage(file)
     this.form.get("imageofPost")?.setValue(file)
  }
  showImage(src:any){
    this.absoluteImgContainer.children[0].setAttribute("src",src)
    this.absoluteImgContainer.classList.add("active-img") 
  }

  addPost(){   
    const formData = new FormData();
    formData.append("post_img",this.form.get("imageofPost")?.value)
    formData.append('post_title',this.title.value)
    formData.append('description',this.descriptions.value)
    formData.append('destination_link',this.destination.value)
    this.service.addPost(formData).subscribe(
      (event)=>{
        switch (event.type){
          case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
            console.log(event);
            break;
          case HttpEventType.Response:
            console.log(event);
            break;
        }
      },
      (error)=>console.log(error),
      ()=>this.showPopUpMessage("succesfully added post")
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

   