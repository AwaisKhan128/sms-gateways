import { myCredentials } from 'src/app/APIS/APIConfig';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { getAccResp, getAccResp1, _Currency, _subaccount } from 'src/app/Classes/getAccResps';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import * as $ from 'jquery';
import { getAccDetails, getAccDetails1, getAccCurrency, getsubAcc, getSignin_responseDBforSuper } from 'src/app/Classes/signin';
import { Router } from '@angular/router';
import { SubscribedDevicesRemoteMessage } from 'src/app/Classes/subscribed_devices_remote_messages';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { response } from 'express';




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

  inbound_messages_total : number = 0
  outbound_messages_total : number = 0
  bounced_messages_total : number = 0

  window: any["$"] = $; 
  constructor(private freeapi: API_Services, private router: Router) { }

  ngOnInit(): void {
    let json = localStorage.getItem("user_data");
    // if(json!=null)
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
      let username = ( myCredentials.username);
      let password = (myCredentials.password);
      this.get_Info(username,password);
      
      
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
          var encoded = EncodeDecode.b64EncodeUnicode(uname + ':' + password);
          this.fetchMessagesCount(encoded)

          // ---------------------Populating items-------------------
      },
      err=>
      {
      }
    )
  }

  fetchMessagesCount(auth:string) {
    const remoteMessages = this.freeapi.getSubscribedDevicesRemoteMessages(270610)
    const getStatisticsSMS = this.freeapi.getStatisticsSMS(auth)
    forkJoin([remoteMessages,getStatisticsSMS]).subscribe( responses =>{
      const remote = responses[0].http_response as SubscribedDevicesRemoteMessage[]
      let response = JSON.parse(JSON.stringify(responses[1]));
      this.bounced_messages_total = response.data.total?.bounced?.count ?? 0 as number
      this.outbound_messages_total = (response.data.total?.outbound?.count ?? 0 as number) + remote.length
      this.inbound_messages_total = response.data.total?.inbound?.count ?? 0 as number
    })
  }

}
