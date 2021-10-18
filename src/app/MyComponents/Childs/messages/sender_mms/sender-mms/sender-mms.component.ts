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
  selector: 'app-sender-mms',
  templateUrl: './sender-mms.component.html',
  styleUrls: ['./sender-mms.component.css']
})
export class SenderMmsComponent implements OnInit {

  messageTo: string =  ""; //"+61411111111,+61422222222";
  pickedDate: string = "" //new Date().toDateString();
  pickedTime: string = "";

  // //MMS
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
  data:any;

  // window: any["$"] = $;
  response: SendResponse | undefined;


  constructor(private apiService: API_Services, private http: HttpClient) { }

  ngOnInit(): void {
    $('#schedule_input_sms_date').prop('disabled', true);
    $('#schedule_input_sms_time').prop('disabled', true);
    $('#schedule_input_mms_date').prop('disabled', true);
    $('#schedule_input_mms_time').prop('disabled', true);
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

    let json = localStorage.getItem("user_data");

    if(json!=null)
    {
        this.data = JSON.parse(json);
        let username = this.data.username;
          let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
          this.apiService.sendMMS(auths,param)
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

}
