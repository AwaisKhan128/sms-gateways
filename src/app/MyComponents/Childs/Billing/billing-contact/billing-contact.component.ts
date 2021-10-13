import { myCredentials } from 'src/app/APIS/APIConfig';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { getAccDetails,getAccDetails1,getAccCurrency,getsubAcc } from 'src/app/Classes/signin';
import * as $ from 'jquery';


@Component({
  selector: 'app-billing-contact',
  templateUrl: './billing-contact.component.html',
  styleUrls: ['./billing-contact.component.css']
})
export class BillingContactComponent implements OnInit {
  data:any;
  getAccDetails:getAccDetails|any;
  getAccDetails1:getAccDetails1|any;
  getAccCurrency:getAccCurrency|any;
  getsubAcc:getsubAcc|any;
  window: any["$"] = $;



  constructor(private freeApi:API_Services) { }

  ngOnInit(): void {
    let json = localStorage.getItem("user_data");
    // if (json!=null)
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      let username = myCredentials.username;
      let password = myCredentials.password;
      var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
      
      console.log((auths));

      this.freeApi.getLogin(auths)
      .subscribe(
        res=>{
          this.getAccDetails = res;
          this.getAccDetails1 = res.data;

          $("#title").text(this.getAccDetails1.account_name);
          $("#email").text(this.getAccDetails1.account_billing_email);
          $("#mobile").text(this.getAccDetails1.account_billing_mobile);

        },
        err=>
        {
          alert(err);

        }
      )
      
    }



  }

}
