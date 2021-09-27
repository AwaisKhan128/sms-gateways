import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';


@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  actionSendSMS() {
    const m : MyMessage = {
      source : "php",
      body : "Hello there",
      to : "{+61411111111}",
      custom_string : "this is a test"
    };
    const param : SendSMSParam = {messages: [m]};
    sen
  }

}
