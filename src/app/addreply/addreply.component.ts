import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-addreply',
  templateUrl: './addreply.component.html',
  styleUrls: ['./addreply.component.css']
})
export class AddreplyComponent implements OnInit{
  replyContainer:any
  @Input()
  comment_id:any
  constructor() {}
  ngOnInit(): void {
      this.replyContainer=document.querySelector('#id_main_add_reply_container')
  }
  collapseAddReplyContainer() {
    if (this.replyContainer.dataset.status=='inactive'){
        this.replyContainer.dataset.status="active";
    }
    else{
        this.replyContainer.dataset.status='inactive';
    }
}
  handleAddComment(){
    
  }

}
