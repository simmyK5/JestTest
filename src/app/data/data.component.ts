import { Component, OnInit } from '@angular/core';
import { FakeService } from '../services/fake.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit{

  constructor(private fakeService:FakeService){

  }

  serviceData:any;
  errorMessage:any;
  greeting:any;


  ngOnInit(): void {
    this.getServiceData();
  }

  getServiceData(){
    this.fakeService.getDataV1().subscribe({
      next:(data)=>{
        this.serviceData=data;
        this.setGreeting();
      },
      error:(error)=>{
        this.errorMessage=error
      },
      complete:()=>{
        console.log('Finished')
      }
    })
  }

  setGreeting(){
    if(this.serviceData.time < 10){
      this.greeting = "Good morning"
    }else if(this.serviceData.time < 20){
      this.greeting = "Good day"
    }else{
      this.greeting = "Good Evening"
    }

  }

}
