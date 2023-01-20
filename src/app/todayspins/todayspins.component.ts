import { Component, OnInit } from '@angular/core';
import { PinterestserviceService } from '../services/pinterestservice.service';

@Component({
  selector: 'app-todayspins',
  templateUrl: './todayspins.component.html',
  styleUrls: ['./todayspins.component.css']
})
export class TodayspinsComponent implements OnInit{
  constructor(private service:PinterestserviceService){

  }
  ngOnInit(): void {
      
  }
  getTodayPins(){
    const d = new Date();
    const day = d.getDate();
    const year = d.getFullYear();
    const month = d.getMonth();
    return d.toLocaleDateString();
  }
}
