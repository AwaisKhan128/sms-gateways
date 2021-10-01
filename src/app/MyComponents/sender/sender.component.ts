import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { MMsMessage, SendMMSParam } from 'src/app/Classes/MMS/send_mms_param';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendResponse } from 'src/app/Classes/SMS/send_sms_response';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { SMSTemplate } from 'src/app/Classes/SMS/view_sms_templates_response';



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

  templates: Array<SMSTemplate> = [];
  selectedTemplateBody: string = "";


  constructor(private apiService: API_Services,
    private http: HttpClient) {


     }

  ngOnInit(): void {
    $('#schedule_input').prop('disabled', true);

    $('#schedule_input_sms').prop('disabled', true);

    this.fetchSMSTemplates()

  }

  templatedSelectionChangeHandler (event: any) {
    (document.getElementById('message') as HTMLInputElement).value = ''
    const templateID = <number>event.target.value;
    var selectedTemplate = this.templates.find(t=> t.template_id == templateID);
    if(selectedTemplate !== null) {
      this.selectedTemplateBody = selectedTemplate!.body;
      (document.getElementById('message') as HTMLInputElement).value = this.selectedTemplateBody
    }
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

  fetchSMSTemplates() {
    this.apiService.getSMSTemplates().
      subscribe(response =>{
        let intialTemplate: SMSTemplate = {template_id:-1, template_name: "NONE", body:""} as SMSTemplate;    
        let intialTemplate2: SMSTemplate = {template_id:-2, template_name: "Helloww", body:"I AM Arrwr2323423UTOFILLINGGG"} as SMSTemplate;    
        let intialTemplate3: SMSTemplate = {template_id:-3, template_name: "ewrwfdsv444", body:"234I234 AM Arrw323r2323423UTOFILLINGGG"} as SMSTemplate;    
        var smsTemplates = response.data?.data as SMSTemplate[];
        smsTemplates.push(intialTemplate);
        smsTemplates.push(intialTemplate2);
        smsTemplates.push(intialTemplate3);
        smsTemplates.forEach(t => this.templates.push(t))
        console.log(this.templates)
        console.log("FETCHED TEMPLATESS")
      })
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
