import { SharedService } from './../../Classes/shared_services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  data:string|any;

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {

    let json = localStorage.getItem("user_data");
    if(json!=null)
    {

      this.data = JSON.parse(json);
    }

    console.log(this.data);
  }
  /* Set the width of the side navigation to 250px */


}
