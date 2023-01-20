import { Component, OnInit, inject } from '@angular/core';
import { interval, timeInterval } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
    btn:any
    container:any
    page:any
    items:any
    cBtn:any
    color:any
    obs$:any
    ngOnInit(): void {
      this.btn = document.querySelectorAll(".btn");
      this.container = document.querySelector(".container");
      this.items = document.querySelectorAll(".auto-text-items")
      this.cBtn = document.querySelector("#section_1 .btn");
      this.scrollTo()
      this.animateText()
    }
    scrollTo(){
      this.btn.forEach((button:any)=>{
        button.addEventListener('click',()=>{
            this.page = document.querySelector(`#${button.dataset.value}`)
            let topPosition = this.page.offsetTop;
            topPosition=topPosition<600?topPosition-60:topPosition;
            window.scrollTo(
                {
                    top:topPosition,
                    left:0,
                    behavior:"smooth"
                }
            )
        })
    })
    }

  
  
  animateText() {
    let index=0;
    for (let i=0;i<this.items.length;i++){
        this.items[i].classList.remove('text-in')
        this.items[i].classList.add('text-out')     
    }
    this.items[index].classList.add("text-in");
    let color = this.items[index].dataset.color;
    this.cBtn.children[0].setAttribute("colors", `primary:${color}`)
    this.items[index].classList.remove("text-out");
    if (index == this.items.length-1){
        index=0;
    }
    else{
        index++;
    }
    this.obs$=interval(3000)
    this.obs$.subscribe(()=>{
      this.animateText
    }
    )
}
}


