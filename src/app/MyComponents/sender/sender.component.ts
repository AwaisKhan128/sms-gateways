import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { SendMMSParam } from 'src/app/Classes/MMS/send_mms_param';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendResponse } from 'src/app/Classes/SMS/send_sms_response';



@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  source: string = "node.js";
  messageBody: string | undefined;//= "Hello there";
  messageTo: string =  ""; //"+61411111111,+61422222222";
  custom_string: string = "this is a test";
  media_file_url: string = "https://www.pikpng.com/pngl/m/56-561816_free-png-whatsapp-png-png-whatsapp-logo-small.png";

  response: SendResponse | undefined;


  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
  }

  actionSendSMS() {
    var messagesList : MyMessage[] = [] ;
    var splitted = this.messageTo.split(","); 
    if (splitted.length > 0) {
        splitted.forEach((element) => { 
          const m : MyMessage = {
            source : this.source,
            body : this.messageBody,
            to : element,
            custom_string : this.custom_string
            //schedule: 1632731133,
          };
          messagesList.push(m)
        });
        console.log(messagesList)
        const param : SendSMSParam = {messages: messagesList};
        this.apiService.sendSMS(param)
          .subscribe(response => {this.response = response});
    }
  }

  actionSendMMS() {
    const m : MyMessage = {
      source : this.source,
      body : "test message, please ignore",
      to : "+61411111111",
      custom_string : this.custom_string
      //schedule: 1632731133,
    };
    const param: SendMMSParam = {media_file: this.media_file_url, messages: [m]}
    this.apiService.sendMMS(param)
      .subscribe(response =>{this.response = response})
  }

}
