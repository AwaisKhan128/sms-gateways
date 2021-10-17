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
import { HTTPResponseSubscribedDevices } from 'src/app/Classes/subscribed_devices';
import { HTTPResponseSubscribedDeviceSim } from 'src/app/Classes/subscribed_devices_sim';


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

  userSelectedASubscribedDevice = 0
  userID: number = 0; 
  subscribedDevices : HTTPResponseSubscribedDevices[] = [];
  sims: HTTPResponseSubscribedDeviceSim[] = [];


  window: any["$"] = $;
  response: SendResponse | undefined;


  constructor(private apiService: API_Services, private http: HttpClient) { }

  ngOnInit(): void {
    $('#schedule_input_sms_date').prop('disabled', true);
    $('#schedule_input_sms_time').prop('disabled', true);
    this.fetchSMSTemplates()
    console.log("REMOTE MESSAGESSS")
    this.fetchSubscribedDevices("23911")
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

  subscribedDeviceSelectionChangeHandler (event: any) {
    console.log("selected device is is 1")
    const selectedSubscribedDeviceID = <number>event.target.value;
    console.log("selected device is is",selectedSubscribedDeviceID)
    if (selectedSubscribedDeviceID !== null || selectedSubscribedDeviceID != undefined) {
      this.userSelectedASubscribedDevice = 1
      this.fetchSubscribedDevicesSim(selectedSubscribedDeviceID.toString())
    }
    else {
      this.userSelectedASubscribedDevice = 0
    }
  }

  simSelectionChangeHandler (event: any) {
    console.log("selected device SIM/PHONE is is 1")
    const selectedSim = <number>event.target.value;
    console.log("selected sim  is",selectedSim)
    if (selectedSim !== null || selectedSim != undefined) {
      this.messageFrom = selectedSim.toString()
      console.log("selected sim is",this.messageFrom)
    }
  }


  actionSendSMS() {
    if (this.messageFrom == null || this.messageFrom == undefined || this.messageFrom == "") {
      Toaster.failureToast("FAILURE","Please select a phone number to send a message from")
      return
    }
    if (this.messageTo == null || this.messageTo == undefined || this.messageTo == "") {
      Toaster.failureToast("FAILURE","To cannot be empty")
      return
    } 

    if(this.messageBody == null || this.messageBody == undefined) {
      Toaster.failureToast("FAILURE","Message Body cannot be empty")
      return
    }

    //localStorage.setItem("user_data", JSON.stringify(content));
    //localStorage.setItem("user_status", "Logged_in");

    let jsonData: string = localStorage.getItem("user_data") as string

    if (jsonData == null) {
      Toaster.failureToast("FAILURE","User is not loggedin, we will give deafult user id for testing purposes")
      this.userID = 270610
    }
    else {
      const data = JSON.parse(jsonData);
      this.userID = data.id      
    }
    console.log("The user id has to be data iss",this.userID)

    this.actionRouteToDevice()
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

  fetchSubscribedDevices(userID: string) {
    this.apiService.getSubscribedDevices(userID).subscribe(
      response => {
        console.log(response)
        let initialDevice: HTTPResponseSubscribedDevices = {
          country:"-1",
          device: "NONE",
          id: -1,
          imei: "-1",
          imsi: "-1",
          phone: "-1",
          username: "-1",
        }
        var devicees = response.http_response as HTTPResponseSubscribedDevices[]
        devicees.push(initialDevice)
        this.subscribedDevices = devicees
      }
    )
  }

  fetchSubscribedDevicesSim(userID: string) {
    this.apiService.getSubscribedDevicesSim(userID).subscribe(
      response => {
        console.log(response)
        let intialSim : HTTPResponseSubscribedDeviceSim = {
          number : "NONE"
        }
        var fetchedSims = response.http_response as HTTPResponseSubscribedDeviceSim[]
        fetchedSims.push(intialSim)
        this.sims = fetchedSims
      }
    )
  }


  async actionRouteToDevice() {
    console.log(this.messageTo)
    try {
      // Add a new document in collection "cities"
      const docRef = await setDoc(doc(db, "RemoteMessages", "rm"+this.userID), {
        to: this.messageTo,
        body: this.messageBody,
        userid: "rm"+this.userID,
        from: this.messageFrom,
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

