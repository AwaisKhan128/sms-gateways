import { forget_username, forget_username_resp,forget_password } from './../../Classes/forgets';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { getAccResp, getAccResp1, _Currency, _subaccount } from 'src/app/Classes/getAccResps';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import * as $ from 'jquery';
import { getAccDetails, getAccDetails1, getAccCurrency, getsubAcc, getSignin_responseDBforSuper } from 'src/app/Classes/signin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  window: any["$"] = $;
  user_email: any;
  user_phone: any;
  user_name:any;
  forget_username_resp:forget_username_resp|any;
  




  constructor(private _free_Api: API_Services) { }



  ngOnInit(): void {



  }

  public forget_username() {

    if(this.user_email!="" && this.user_phone!='')
    {

      var users = new forget_username();
  
      if (this.user_email != '' && this.user_phone == '') {
        users.email = this.user_email;
        users.phone_number = '';
        this._free_Api.Send_forget_notify(users)
          .subscribe(
            res => {
              console.log(res);
              this.forget_username_resp = res;
              alert(this.forget_username_resp.response_msg );
              $('#user_email').val('');

            },
            err => {
              alert("Error found");
            }
          )
  
      }
      else if (this.user_phone != '' && this.user_email == '' )
      {
        users.email = '';
        users.phone_number = this.user_phone;
        this._free_Api.Send_forget_notify(users)
          .subscribe(
            res => {
              console.log(res);
              this.forget_username_resp = res;
              alert(this.forget_username_resp.response_code );
              $('#user_phone').val('');

            },
            err => {
              alert("Error found");
  
            }
          )
      }
  
      else if (this.user_phone == '' && this.user_email == '')
      {
        alert("Minimum one input is required!")
      }
  
      else if (this.user_phone != '' && this.user_email != '')
      {
  
        users.email = this.user_email;
        users.phone_number = '';
        this._free_Api.Send_forget_notify(users)
          .subscribe(
            res => {
              console.log(res);
              this.forget_username_resp = res;
              alert(this.forget_username_resp.response_code );
              $('#user_email').val('');

            },
            err => {
              alert("Error found");
            }
          )
      }
    }
    else if(this.user_email=="" && this.user_phone==''){
      alert("Fields can not be empty!");
    }




  }

  public forget_password()
  {
    if (this.user_name!='')
    {

      var forgets = new forget_password();
      forgets.user_name = this.user_name;
      this._free_Api.Send_forget_passcode(forgets)
      .subscribe
      (
        res=>
        {
          this.forget_username_resp = res;
          alert(this.forget_username_resp.response_msg);
          $('#user_name').val('');
        },
        err=>
        {
          alert(err);
          console.log(err);
        }
      )
    }
    else{
      alert("Please enter your username!");
    }
  }


}
