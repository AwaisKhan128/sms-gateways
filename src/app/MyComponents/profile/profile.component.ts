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

  OnTop_Change(val:any)
  {

    if (val==0)
    {
      $('#dashboard').addClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==1)
    {
      $('#dashboard').removeClass('active')
      $('#personal').addClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==2)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').addClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==3)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').addClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }

    else if (val==4)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').addClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==5)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').addClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==7)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').addClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==8)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').addClass('active')
      $('#admin').removeClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==9)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').addClass('active')
      $('#reseller').removeClass('active')

    }
    else if (val==10)
    {
      $('#dashboard').removeClass('active')
      $('#personal').removeClass('active')
      $('#templates').removeClass('active')
      $('#contacts').removeClass('active')
      $('#messages').removeClass('active')
      $('#sender').removeClass('active')
      $('#billing').removeClass('active')
      $('#topup').removeClass('active')
      $('#admin').removeClass('active')
      $('#reseller').addClass('active')

    }
  }

  /* Set the width of the side navigation to 250px */


}
