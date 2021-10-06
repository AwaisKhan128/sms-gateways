import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { getAccResp, getAccResp1, _Currency, _subaccount } from 'src/app/Classes/getAccResps';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import * as $ from 'jquery';
import { getAccDetails, getAccDetails1, getAccCurrency, getsubAcc, getSignin_responseDBforSuper } from 'src/app/Classes/signin';
import { Router } from '@angular/router';
import { StatisticsSMSData } from 'src/app/Classes/Statistics/statistics_sms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uname: any;
  passcode: any;
  getAccResp: any;
  getAccDetails: getAccDetails|any;
  getAccDetails1: getAccDetails1|any;
  getAccCurrency: getAccCurrency|any;
  getsubAcc: getsubAcc|any;

  data:any;

  stats : StatisticsSMSData | undefined
  inbound_messages_total : number = 0
  outbound_messages_total : number = 0
  bounced_messages_total : number = 0

  window: any["$"] = $; 
  constructor(private freeapi: API_Services, private router: Router) { }

  ngOnInit(): void {
    // $("#billing").hide();
    let json = localStorage.getItem("user_data");
    if(json!=null)
    {

      this.data = JSON.parse(json);
      let username = this.data.username;
      let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);

      this.get_Info(username,password);
      this.fetchStatistcs()

    }





  }

  public get_Info(uname:string,password:string) {
    // this.Login(this.uname, this.passcode);
    var encoded = EncodeDecode.b64EncodeUnicode(uname + ':' + password);
    this.freeapi.getLogin(encoded)
    .subscribe(
      res=>
      {

        console.log(res);
          this.getAccDetails = res;
          this.getAccDetails1 = res.data;
          this.getAccCurrency = res._currency;
          this.getsubAcc = res._subaccount;

          // ---------------------Populating items-------------------
      },
      err=>
      {
      }
    )
  }

  fetchStatistcs() {
    console.log("11")
    this.freeapi.getStatisticsSMS().subscribe(
      response=> {
        console.log("22")
        this.bounced_messages_total = response.total!.bounced?.count! as number
        this.inbound_messages_total = response.total!.inbound!.count! as number
        this.outbound_messages_total = response.total!.outbound!.count! as number

        console.log("inbound"+this.inbound_messages_total)
        console.log("outbound"+this.outbound_messages_total)
        console.log("bounced"+this.bounced_messages_total)
      }
    )
  }

}
