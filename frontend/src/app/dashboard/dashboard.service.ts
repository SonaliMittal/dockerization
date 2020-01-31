import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }


  getList(){
    return this.http.get("http://localhost:3200/api/v1/list");
  }
}
