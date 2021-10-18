import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { MMsMessage, SendMMSParam } from 'src/app/Classes/MMS/send_mms_param';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendResponse } from 'src/app/Classes/SMS/send_sms_response';
import { SMSTemplate } from 'src/app/Classes/SMS/view_sms_templates_response';
import { DateHandler } from 'src/app/Helper/datehandler';
import { Toaster } from 'src/app/Helper/toaster';
import * as $ from 'jquery';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';


@Component({
  selector: 'app-sender-sms',
  templateUrl: './sender-sms.component.html',
  styleUrls: ['./sender-sms.component.css']
})
export class SenderSmsComponent implements OnInit {

  // //SMS
  messageBody: string | undefined;//= "Hello there";
  messageTo: string =  ""; //"+61411111111,+61422222222";
  messageFrom: string =  ""
  templates: Array<SMSTemplate> = [];
  selectedTemplateBody: string = "";
  shouldScheduleMessage: number = 0
  pickedDate: string = "" //new Date().toDateString();
  pickedTime: string = "";
  defaultValue:any;
  data:any;

  // window: any["$"] = $;
  response: SendResponse | undefined;


  constructor(private apiService: API_Services, private http: HttpClient) { }

  ngOnInit(): void {
    $('#schedule_input_sms_date').prop('disabled', true);
    $('#schedule_input_sms_time').prop('disabled', true);
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

        let json = localStorage.getItem("user_data");

        if(json!=null)
        {
            this.data = JSON.parse(json);
            let username = this.data.username;
            let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
            var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);            
            this.apiService.sendSMS(auths,param)
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
  }

  fetchSMSTemplates() {
    let json = localStorage.getItem("user_data");

    if(json!=null)
    {
        this.data = JSON.parse(json);
        let username = this.data.username;
          let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
          this.apiService.getSMSTemplates(auths).
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
