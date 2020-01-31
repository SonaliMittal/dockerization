import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http:DashboardService) { }
  private data=[];
  ngOnInit() {
    console.log("===")
    this.getBooklist();
  }
   getBooklist(){
     this.http.getList().subscribe((results:any)=>{
       console.log(results.bVotes)
       this.data=results.bVotes;
     })
   }
}
