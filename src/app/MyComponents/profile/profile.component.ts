import { data } from 'jquery';
import { SharedService } from './../../Classes/shared_services';
import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  data:string|any;
  data1:string|any;
  window: any["$"] = $;


  constructor(private sharedService:SharedService,private router: Router) { }

  ngOnInit(): void {

    

    let json = localStorage.getItem("user_data");
    let json1 = localStorage.getItem("user_status");


    if(json!=null)
    {

      this.data = JSON.parse(json);
    }
    if(json1!=null)
    {

      this.data1 = (json1);
      if (this.data1!="Logged_in")
      {
        this.router.navigate(['./'])
      }
    }
    // else{
    //   this.router.navigate(['./'])
    // }

    //console.log((this.data));
    // console.log(this.data1);

  }
  /* Set the width of the side navigation to 250px */


}
