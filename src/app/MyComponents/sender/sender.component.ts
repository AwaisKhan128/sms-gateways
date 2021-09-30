import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { MMsMessage, SendMMSParam } from 'src/app/Classes/MMS/send_mms_param';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendResponse } from 'src/app/Classes/SMS/send_sms_response';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';



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
  window: any["$"] = $;

  response: SendResponse | undefined;

  selectedFile! : File ;

  constructor(private apiService: API_Services,
    private http: HttpClient) {

     }

  ngOnInit(): void {
    $('#schedule_input').prop('disabled', true);

    $('#schedule_input_sms').prop('disabled', true);
  }

  onFileSelected(event) {
    console.log(event)
    this.selectedFile = <File>event.target.files[0]
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('base url',fd)
  }

  actionSendSMS() {
    var messagesList : MyMessage[] = [] ;
    var splitted = this.messageTo.split(","); 
    if (splitted.length > 0) {
        splitted.forEach((element) => { 
          const m : MyMessage = {
            body : this.messageBody,
            to : element,
            from : "+61411111111",
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
    const mms_message : MMsMessage = {
      source : "php",
      to: "+61411111111",
      from : "+61411111111",
      subject : "Test MMS",
      body : "Image attached",
     //"schedule": 1512538536
    }
    const param: SendMMSParam = {media_file: this.media_file_url, messages: [mms_message]}
    this.apiService.sendMMS(param)
      .subscribe(response =>{this.response = response})

      // var messagesList : MMsMessage[] = [] ;
      // var splitted = this.messageTo.split(","); 
      // if (splitted.length > 0) {
      //     splitted.forEach((element) => { 
      //       const mms_message : MMsMessage = {
      //         source : "php",
      //         to: "+61411111111",
      //         from : "+61411111111",
      //         subject : "Test MMS",
      //         body : "Image attached",
      //        //"schedule": 1512538536
      //       }
      //       messagesList.push(mms_message)
      //     });
      //     console.log(messagesList)
      //     const param: SendMMSParam = {media_file: this.media_file_url, messages: messagesList}
      //     this.apiService.sendMMS(param)
      //       .subscribe(response =>{this.response = response})
      // }
  }
  onScheduler()
  {
    if ($('#scheduler').prop('checked')) {
      //blah blah
      $('#schedule_input').prop('disabled', false);
      

    }
    else
    {
      $('#schedule_input').prop('disabled', true);

    }
  }

  onScheduler_sms()
  {
    if ($('#scheduler_sms').prop('checked')) {
      //blah blah
      $('#schedule_input_sms').prop('disabled', false);
      

    }
    else
    {
      $('#schedule_input_sms').prop('disabled', true);

    }
  }

}
