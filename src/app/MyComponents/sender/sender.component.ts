import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { MMsMessage, SendMMSParam } from 'src/app/Classes/MMS/send_mms_param';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendResponse } from 'src/app/Classes/SMS/send_sms_response';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { SMSTemplate } from 'src/app/Classes/SMS/view_sms_templates_response';
import { DatePipe } from '@angular/common';
import { Toaster } from 'src/app/Helper/toaster';
import { DateHandler } from 'src/app/Helper/datehandler';




@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  //SMS
  messageBody: string | undefined;//= "Hello there";
  messageTo: string =  ""; //"+61411111111,+61422222222";
  messageFrom: string =  ""
  templates: Array<SMSTemplate> = [];
  selectedTemplateBody: string = "";
  shouldScheduleMessage: number = 0
  pickedDate: string = "" //new Date().toDateString();
  pickedTime: string = "";

  //MMS
  source: string = "node.js";
  mms_messageTo: string =  ""; //"+61411111111,+61422222222";
  mms_messageFrom: string =  ""
  mms_message_subject: string = "this is a test";
  mms_message = "Image Attached"
  media_file_url: string = "http://www.pikpng.com/pngl/m/56-561816_free-png-whatsapp-png-png-whatsapp-logo-small.png";
  selectedFile! : File ;
  shouldScheduleMMSMessage: number = 0
  mmsPickedDate: string = "" //new Date().toDateString();
  mmsPickedTime: string = "";

  window: any["$"] = $;
  response: SendResponse | undefined;


<<<<<<< HEAD
     }
=======

  constructor(private apiService: API_Services, private http: HttpClient) {
  }
>>>>>>> 35719ed9439142d694432f77f128c4a35c4e90af

// My 
  ngOnInit(): void {
    $('#schedule_input_sms_date').prop('disabled', true);
    $('#schedule_input_sms_time').prop('disabled', true);
    $('#schedule_input_mms_date').prop('disabled', true);
    $('#schedule_input_mms_time').prop('disabled', true);
    this.fetchSMSTemplates()
  }

  templatedSelectionChangeHandler (event: any) {
    (document.getElementById('message') as HTMLInputElement).value = ''
    const templateID = <number>event.target.value;
    var selectedTemplate = this.templates.find(t=> t.template_id == templateID);
    if(selectedTemplate !== null) {
      this.selectedTemplateBody = selectedTemplate!.body;
      this.messageBody = this.selectedTemplateBody
    }
  }

  onFileSelected(event) {
    console.log(event)
    this.selectedFile = <File>event.target.files[0]
    console.log(this.selectedFile)
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('base url',fd)
  }

  actionSendSMS() {
    if (this.messageFrom == null || this.messageFrom == undefined || this.messageFrom == "") {
      Toaster.failureToast("FAILURE","From cannot be empty")
      return
    }
    if (this.messageTo == null || this.messageTo == undefined || this.messageTo == "") {
      Toaster.failureToast("FAILURE","To cannot be empty")
      return
    } 
    var unixTimestamp = DateHandler.convertToUnixTimestamp(this.pickedDate, this.pickedTime)
    console.log(unixTimestamp)
    var messagesList : MyMessage[] = [] ;
    var splitted = this.messageTo.split(","); 
    if (splitted.length > 0) {
        splitted.forEach((element) => { 
          if (this.shouldScheduleMessage == 0)  {
            const m : MyMessage = {
              body : this.messageBody,
              to : element,
              from : this.messageFrom,
            };
            messagesList.push(m)
          }
          else {
            const m : MyMessage = {
              body : this.messageBody,
              to : element,
              from : this.messageFrom,
              schedule: unixTimestamp,
            };
            messagesList.push(m)
          }
        });
        console.log(messagesList)
        const param : SendSMSParam = {messages: messagesList};
        this.apiService.sendSMS(param)
          .subscribe(response => {
            this.response = response
            if (this.response.response_code == "SUCCESS") {
              Toaster.sucessToast(this.response.response_msg!)
            }
            else {
              Toaster.failureToast(this.response.response_code!, this.response.response_msg!)
            }
        });
    }
  }

  actionSendMMS() {
    if (this.mms_messageFrom == null || this.mms_messageFrom == undefined || this.mms_messageFrom == "") {
      Toaster.failureToast("FAILURE","From field is required for sending MMS")
      return
    }
    if (this.mms_messageTo == null || this.mms_messageTo == undefined || this.mms_messageTo == "") {
      Toaster.failureToast("FAILURE","To field is required for sending MMS")
      return
    } 
    var mm_unixTimestamp = DateHandler.convertToUnixTimestamp(this.pickedDate, this.pickedTime)
    var mmsMessageBody = this.mms_message !== "" ? this.mms_message : "Image Attached"
    var messagesList : MMsMessage[] = [] ;
    var splitted = this.messageTo.split(","); 
    if (splitted.length > 0) {
        splitted.forEach((element) => { 
          if (this.shouldScheduleMMSMessage == 0)  {
            const mms_message : MMsMessage = {
              source : "node.js",
              to: this.mms_messageTo,
              from : this.mms_messageFrom,
              subject : this.mms_message_subject,
              body : mmsMessageBody,
            }
            messagesList.push(mms_message)
          }
          else {
            const mms_message : MMsMessage = {
              source : "node.js",
              to: this.mms_messageTo,
              from : this.mms_messageFrom,
              subject : this.mms_message_subject,
              body : mmsMessageBody,
              schedule: mm_unixTimestamp
            }
            messagesList.push(mms_message)
          }

        });
        console.log(messagesList)
        const param: SendMMSParam = {media_file: this.media_file_url, messages: messagesList}
        this.apiService.sendMMS(param)
          .subscribe(response =>{
            this.response = response
            console.log("Before")
            if (this.response.response_code == "SUCCESS") {
              console.log("Sucess")
              Toaster.sucessToast(this.response.response_msg!)
            }
            else {
              console.log("Failure")
              Toaster.failureToast(this.response.response_code!, this.response.response_msg!)
            }
            console.log("After")
          })
    }
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

  onScheduler_mms()
  {
    if ($('#scheduler_mms').prop('checked')) {
      $('#schedule_input_mms_date').prop('disabled', false);
      $('#schedule_input_mms_time').prop('disabled', false);
      this.shouldScheduleMMSMessage = 1
    }
    else
    {
      $('#schedule_input_mms_date').prop('disabled', true);
      $('#schedule_input_mms_time').prop('disabled', true);
      this.shouldScheduleMMSMessage = 0
    }
  }

  onScheduler_sms()
  {
    if ($('#scheduler_sms').prop('checked')) {
      //blah blah
      $('#schedule_input_sms_date').prop('disabled', false);
      $('#schedule_input_sms_time').prop('disabled', false);
      this.shouldScheduleMessage = 1
    }
    else
    {
      $('#schedule_input_sms_date').prop('disabled', true);
      $('#schedule_input_sms_time').prop('disabled', true);
      this.shouldScheduleMessage = 0
    }
  }
}

