import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendResponse } from 'src/app/Classes/SMS/send_sms_response';
import { SMSTemplate } from 'src/app/Classes/SMS/view_sms_templates_response';
import { DateHandler } from 'src/app/Helper/datehandler';
import { Toaster } from 'src/app/Helper/toaster';
import * as $ from 'jquery';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, setDoc, doc, getFirestore } from "firebase/firestore"; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh5DCzVFWsrqihS6_Tbt1hwlFYxFeHaIU",
  authDomain: "sms-gateway-ccdc4.firebaseapp.com",
  projectId: "sms-gateway-ccdc4",
  storageBucket: "sms-gateway-ccdc4.appspot.com",
  messagingSenderId: "415413135777",
  appId: "1:415413135777:web:ea60a1b97d20f00cd183e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


@Component({
  selector: 'app-sender-remote-sms',
  templateUrl: './sender-remote-sms.component.html',
  styleUrls: ['./sender-remote-sms.component.css']
})
export class SenderRemoteSmsComponent implements OnInit {

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

  window: any["$"] = $;
  response: SendResponse | undefined;


  constructor(private apiService: API_Services, private http: HttpClient) { }

  ngOnInit(): void {
    $('#schedule_input_sms_date').prop('disabled', true);
    $('#schedule_input_sms_time').prop('disabled', true);
    this.fetchSMSTemplates()
    console.log("REMOTE MESSAGESSS")

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

    this.actionRouteToDevice(this.messageBody!, this.messageTo, this.messageFrom!)

    // var unixTimestamp = DateHandler.convertToUnixTimestamp(this.pickedDate, this.pickedTime)
    // console.log(unixTimestamp)
    // var messagesList : MyMessage[] = [] ;
    // var splitted = this.messageTo.split(","); 
    // if (splitted.length > 0) {
    //     splitted.forEach((element) => { 
    //       if (this.shouldScheduleMessage == 0)  {
    //         const m : MyMessage = {
    //           body : this.messageBody,
    //           to : element,
    //           from : this.messageFrom,
    //         };
    //         messagesList.push(m)
    //       }
    //       else {
    //         const m : MyMessage = {
    //           body : this.messageBody,
    //           to : element,
    //           from : this.messageFrom,
    //           schedule: unixTimestamp,
    //         };
    //         messagesList.push(m)
    //       }
    //     });
    //     console.log(messagesList)
    //     const param : SendSMSParam = {messages: messagesList};
    //     this.apiService.sendSMS(param)
    //       .subscribe(response => {
    //         this.response = response
    //         if (this.response.response_code == "SUCCESS") {
    //           Toaster.sucessToast(this.response.response_msg!)
    //         }
    //         else {
    //           Toaster.failureToast(this.response.response_code!, this.response.response_msg!)
    //         }
    //     });
    // }
  }

  fetchSMSTemplates() {
    this.apiService.getSMSTemplates().
      subscribe(response =>{
        let intialTemplate: SMSTemplate = {template_id:-1, template_name: "NONE", body:""} as SMSTemplate;      
        var smsTemplates = response.data?.data as SMSTemplate[];
        smsTemplates.push(intialTemplate);
        smsTemplates.forEach(t => this.templates.push(t))
        console.log(this.templates)
        console.log("FETCHED TEMPLATESS")
      })
  }

  async actionRouteToDevice(messageBody: string, messageTo:string, messageFrom: string) {
    try {
      // Add a new document in collection "cities"
      const docRef = await setDoc(doc(db, "RemoteMessages", "rm270610"), {
        to: messageTo,
        body: messageBody,
        userid: "rm270610",
        from: messageFrom,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
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

