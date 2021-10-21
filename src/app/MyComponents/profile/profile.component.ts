import { Toaster_Service } from 'src/app/Classes/ToasterNg';
import { SharedService } from './../../Classes/shared_services';
import { Component, OnInit } from '@angular/core';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {MatSidenavModule} from '@angular/material/sidenav';
import { API_Services } from 'src/app/APIS/freeapi.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  data:string|any;
  data1:string|any;
  window: any["$"] = $;

  dropdown_Clicked()
  {
    console.log("its drop down navbar");
  }


  showFiller = false;

  dropDown()
  {
    console.log("Nav bar dropped");
    // $('#navbarSupportedContent').animate({height: 'show', opacity: '0', filter: 'alpha(opacity=0)'}, {duration: 0}).animate({opacity: '.5', filter: 'alpha(opacity=50)', top: 58}, {duration: 300, easing: 'easeInBack'}).animate({opacity: '1', filter: 'alpha(opacity=100)', top: 24}, {duration: 200, easing: 'easeOutBack'});
  }


  constructor(private sharedService:SharedService,public router: Router,private freeapi: API_Services) { }

  ngOnInit(): void {


    let json = localStorage.getItem("user_data");
    let json1 = localStorage.getItem("user_status");
    console.log(json)


    if(json!=null)
    {

      this.data = JSON.parse(json);

      let username = this.data.username;
      let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      let permissions = this.data.permissions;
      let type = this.data.type;
      // console.log(permissions);


      // let username = myCredentials.username;
      // let password = ( myCredentials.password);
      let auth = EncodeDecode.b64EncodeUnicode(username+':'+password)
      this.freeapi.getLogin(auth)
      .subscribe
      (
        res=>
        {
            let data = JSON.parse(JSON.stringify(res));
            let balance = data.data.balance;
            // var button_text = document.getElementById('your_button_id').innerHTML;
            
            console.log(balance);
            // console.log($('#web_balance').text());
            // console.log($('#web_balance').val());
            // console.log($('#web_balance').html());
            this.manageUIwithPermissions(type, permissions);


            // $('#web_balance').attr('text', 'balance');
            $('#web_balance').val(balance);
        },
        err=>
        {
          console.log(err);
        }
      )

      

    }

    if(json1!=null)
    {

      this.data1 = (json1);
      if (this.data1!="Logged_in")
      {
        this.router.navigate(['./'])
      }
      else if (this.data1 == null)
      {
        this.router.navigate(['./'])
      }
    }


    else{
      this.router.navigate(['./'])
    }

    //console.log((this.data));
    // console.log(this.data1);

  }
  manageUIwithPermissions(type:string,permissions:any) {
    let sms = permissions.sms;
    let mms = permissions.mms;
    let contacts = permissions.contacts;
    let templates = permissions.templates;
    let billings = permissions.billings;
    let top_ups = permissions.top_ups;
    let resellers = permissions.resellers;
    let banned = permissions.banned;

    if (type != 'superadmins')
    {
      if (sms==0 && mms==0)
      {
        $('#messages').hide()
      }

      if (contacts==0)
      {
        $('#contacts').hide()
      }

      if (templates==0)
      {
        $('#templates').hide()
      }

      if (billings == 0)
      {
        $('#billing').hide()
      }

      if (top_ups==0)
      {
        $('#topup').hide()

      }
      if (resellers ==0 )
      {
        $('#reseller').hide();
      }

      if (banned ==1 )
      {
        Toaster_Service.toastNotification_D("You are banned! Contact Administrator")
        this.logout();
      }

    }
    else
    {

    }

    
  }

  update_val(event:any)
  {
    console.log(event.target.id)
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

    else if (val==11)
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
      $('#reseller').removeClass('active')

    }

    else if (val==11)
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
      $('#reseller').removeClass('active')

    }


  }

  /* Set the width of the side navigation to 250px */



  logout()
  {
    localStorage.removeItem("user_data")
    localStorage.removeItem("user_status");

    this.router.navigate(['']); 
  }
}
