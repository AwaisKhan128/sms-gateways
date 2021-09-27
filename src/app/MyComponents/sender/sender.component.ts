import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendSMSResponse } from 'src/app/Classes/SMS/send_sms_response';


@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  response: SendSMSResponse | undefined;


  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
  }

  actionSendSMS() {
    const m : MyMessage = {
      source : "php",
      body : "Hello there",
      to : "{+61411111111}",
      custom_string : "this is a test",
      schedule: 1632731133,
    };
    const param : SendSMSParam = {messages: [m]};
    this.apiService.sendSMS(param)
    .subscribe(response => {this.response = response});
  }

}
