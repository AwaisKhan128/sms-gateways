import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Operator } from 'rxjs';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { DevicesMatchingOperator } from 'src/app/Classes/devices_matching_operator';
import { PhoneOperator } from 'src/app/Classes/operatorResponse';
import { USSDMatchingOperators } from 'src/app/Classes/ussd_matching_operator';
import { FormsModule } from '@angular/forms';
import { collection, addDoc, setDoc, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"; 
import { initializeApp } from '@firebase/app';
import { FirebaseUSSDInquiry } from 'src/app/Classes/firebase_ussd_inquiry';
import { Toaster } from 'src/app/Helper/toaster';
import { InquiryResponseType } from 'src/app/Classes/inquiry_response_type';

const firebaseConfig = {
  apiKey: "AIzaSyDyiduM5noPodZMAYyXMeMZxY4gOac3_fI",
  authDomain: "sms-gateway-app-bf4bc.firebaseapp.com",
  projectId: "sms-gateway-app-bf4bc",
  storageBucket: "sms-gateway-app-bf4bc.appspot.com",
  messagingSenderId: "330157825905",
  appId: "1:330157825905:web:e9d7e8575b215f0a22e0d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


@Component({
  selector: 'app-send-ussd-inquiry',
  templateUrl: './send-ussd-inquiry.component.html',
  styleUrls: ['./send-ussd-inquiry.component.css']
})

export class SendUSSDInquiryComponent implements OnInit {

  areAllNumbersSelected = false
  didSendSelectedDeviceMessage = false

  responseTypes: InquiryResponseType[] = [];

  operators: PhoneOperator[] = [];
  phoneNumbers: DevicesMatchingOperator[] = [];
  ussds: USSDMatchingOperators[] = [];
  selectedUSSD = ""
  selectedOPcode = "0"
  selectedResponseType = 1

  ussdInquires : FirebaseUSSDInquiry[] = [];

  constructor(private apiService: API_Services) { }




  
  ngOnInit(): void {
    this.populateReponseTypes()
    this.getOperators()
  }


  populateReponseTypes() {
    this.responseTypes = []
    const rt1 : InquiryResponseType = {
      id:1,
      response_type: "Number",
      isSelected: true
    }
    const rt2 : InquiryResponseType = {
      id:2,
      response_type: "Balance",
      isSelected: false
    }

    this.responseTypes.push(rt1)
    this.responseTypes.push(rt2)
  }

  //change events
  onOperatorCodeSelected(event: any) {
    const opCode = <string>event.target.value;
    console.log(opCode)
    this.selectedOPcode = opCode
    console.log("SSSSDD",opCode)
    if(opCode !== "NONE") {
      this.populateReponseTypes()
      this.getListOfDevicesForOperator(opCode.toString())
      this.getListOfUSSD(this.selectedOPcode.toString())
    }
    else {
      this.phoneNumbers = [];
      this.ussds = [];
    }
  }

  onResponseTypeSelected(event: any) {
    const rTypeSelectedID = <number>event.target.value;
    console.log("selected response type",rTypeSelectedID)
    console.log("selected 222",this.responseTypes)
    if (this.selectedOPcode != "NONE") {
      if(rTypeSelectedID == 1) {
        this.selectedResponseType == 1
        this.getListOfUSSD(this.selectedOPcode.toString())
      }
      else {
        this.selectedResponseType == 2
        this.getListOBalances(this.selectedOPcode.toString())
      } 
    }
  }

  specificNumbersSelected(event: any) {
    const number = <string>event.target.value;
    let element = <HTMLInputElement> document.getElementById(number);  
    if (element.checked) { 
      this.phoneNumbers.forEach(e=>{
        if(e.number! == number) {
          e.isDisabled = false
          console.log("founddd")
        }
      })
    }
    else {
      this.phoneNumbers.forEach(e=>{
        if(e.number! == number) {
          e.isDisabled = true
          e.ussdCodeToSend = ""
          console.log("founddd to disable")
        }
      })
    }
  }

  allNumbersSelected(event: any) {
    this.phoneNumbers.forEach(i=>{
      let element = <HTMLInputElement> document.getElementById(i.number!);  
      if (element.checked) { 
        element.checked = false
        i.isDisabled! = true
        i.ussdCodeToSend = ""
        element.checked = false
      }
      else {
        element.checked = true
        i.isDisabled! = false
      }
    })
  }

  
  listenFirebaseEvents() {
    const selectedNumbs = this.phoneNumbers.filter(e=>e.isDisabled == false)
    selectedNumbs.forEach(e=>{
      const unsub = onSnapshot(doc(db, "InquiryCall", "opcode_"+ this.selectedOPcode + "_" + e.number), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const snap = doc.data()! as FirebaseUSSDInquiry
        console.log("DEVICE REPLY", snap.reply!)
        console.log("DEVICE STATUS", snap.myStatus)
        let deviceNumber = (doc.data()!["device"] as string)
        this.phoneNumbers.filter(k=> {
          if(k.number! == deviceNumber) {
            k.defaultUSSDReply! = snap.reply
            k.defaultUSSDStatus! = snap.myStatus
          }
        })
      });
    })
  }


  //button clicks
  actionCopyToSelected(event: any) {
    this.phoneNumbers.forEach(i=>{
      if(i.isDisabled == false) {
        const selected = this.ussds[0].ussd as string
        this.phoneNumbers.forEach(e=>{
          if (e.number! == i.number!) {
              e.ussdCodeToSend = selected
          }
        })
        console.log("passeddd")
      }
      else {
        this.phoneNumbers.forEach(e=>{
          if (e.number! == i.number!) {
              e.ussdCodeToSend = ""
          }
        })
        console.log("falikeddd")
      }
    })
  }
  
  actionClearAll(event: any) {
    this.phoneNumbers.forEach(e=>{
      if (e.number! == e.number!) {
          e.ussdCodeToSend = ""
      }
    })
  }

  async actionSend() {
    const selectedNumbs = this.phoneNumbers.filter(e=>e.isDisabled == false)
    if (selectedNumbs.length <= 0) {
      console.log("NONE SELECTEDD")
      Toaster.failureToast("FAILURE","NO number was selected!")
      return 
    }
    else {
      var emptyCodeArray: string[] = []
      selectedNumbs.forEach(e=> {
        const value = e.ussdCodeToSend!
        if(value == "") {
            emptyCodeArray.push(value)
        }
      })
      if (emptyCodeArray.length > 0) {
        console.log("TOO MANY EMPTY SEND WITH NOE CODESS")
        Toaster.failureToast("FAILURE","USSD Code are required!")
        return
      }
    }

    var selectedResponseValue = ""
    if(this.selectedResponseType == 1) {
      selectedResponseValue = "Number"
    }
    else {
      selectedResponseValue = "Balance"
    }

    console.log("SELECTEDD")
    try {
      selectedNumbs.forEach(e=>{
        const docRef = setDoc(doc(db, "InquiryCall", "opcode_"+this.selectedOPcode+"_"+e.number!), {
          device: e.number!,
          reply: "Waiting for Reply",
          myStatus: "Sending",
          code: e.ussdCodeToSend!,
          type: selectedResponseValue
        });  
      })
      Toaster.sucessToast("SUCESS")
      this.listenFirebaseEvents()
    } catch (e) {
      console.error("Error adding document: ", e);
      Toaster.failureToast("FAILURE","Something went wrong")
    }

  }


  //apis
  getOperators() {
    this.apiService.getlistofOperators().subscribe(
      e=>{
        const ops = e.http_response as PhoneOperator[]
        let k : PhoneOperator = {
          id: -1,
          operator_name: "NONE",
          operator_code: "NONE"
        }
        ops.push(k)
        console.log("ops 0",ops[0])
        this.operators = ops
      }
    )
  }

  getListOfDevicesForOperator(opcode: string) {
      this.apiService.getlistofDevicesForOperator(opcode).subscribe(
        e=> {
          this.phoneNumbers = [];
          const d = e.http_response as DevicesMatchingOperator[]
          console.log(d)
          d.forEach(e=>{
            e.number!
            e.isDisabled = true
            e.defaultUSSDReply = "N/A"
            e.defaultUSSDStatus = "Not Send"
            e.ussdCodeToSend = ""
          })
          this.phoneNumbers = d
        }
      )
  }

  getListOfUSSD(opcode: string) {
      this.apiService.getListofUSSDsForOperator(opcode).subscribe(e=>{
          const my_ussds = e.http_response as USSDMatchingOperators[]
          this.ussds = my_ussds
          this.selectedUSSD = this.ussds[0].ussd as string
      })
  }

  getListOBalances(opcode: string) {
    this.apiService.getListofBalancesForOperator(opcode).subscribe(e=>{
        const my_ussds = e.http_response as USSDMatchingOperators[]
        console.log("asdad",my_ussds.length)
        this.ussds = my_ussds
        if (my_ussds.length > 0) {
            this.selectedUSSD = this.ussds[0].ussd as string
        }
        else {
          this.selectedUSSD = ""
        }
    })
  }


}

