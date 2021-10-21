import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Operator } from 'rxjs';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { DevicesMatchingOperator } from 'src/app/Classes/devices_matching_operator';
import { PhoneOperator } from 'src/app/Classes/operatorResponse';
import { USSDMatchingOperators } from 'src/app/Classes/ussd_matching_operator';
import { FormsModule } from '@angular/forms';
import { collection, addDoc, setDoc, doc, getFirestore, onSnapshot } from "firebase/firestore"; 
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
  selectedOPcode = 0
  selectedResponseType = 1

  ussdInquires : FirebaseUSSDInquiry[] = [];

  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
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

    this.getOperators()
  }



  //change events
  onOperatorCodeSelected(event: any) {
    const opCode = <number>event.target.value;
    console.log(opCode)
    this.selectedOPcode = opCode
    if(opCode !== -1) {
      this.getListOfDevicesForOperator(opCode.toString())
      this.getListOfUSSD(this.selectedOPcode.toString())
      this.responseTypes[0].isSelected! = true 
      this.responseTypes[1].isSelected! = false 
    }
    else {
      this.phoneNumbers = [];
      this.ussds = [];
    }
  }

  onResponseTypeSelected(event: any) {
    const rTypeSelectedID = <number>event.target.value;
    console.log("selected response type",rTypeSelectedID)
    if(rTypeSelectedID == 1) {
        this.getListOfUSSD(this.selectedOPcode.toString())
    }
    else {
        this.getListOBalances(this.selectedOPcode.toString())
    }
  }

  specificNumbersSelected(event: any) {
    const number = <string>event.target.value;
    if ($('#'+number).prop('checked')) {
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
      if ($('#'+i.number!).prop('checked')) {
        $('#'+i.number!).prop('checked', false)
        i.isDisabled! = true
        i.ussdCodeToSend = ""
      }
      else {
        $('#'+i.number!).prop('checked', true)
        i.isDisabled! = false
      }
    })
  }

  listenFirebaseEvents() {
    const unsub = onSnapshot(doc(db, "InquiryCall", "opcode_"+ this.selectedOPcode), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      let k = (doc.data()!["devices"] as FirebaseUSSDInquiry[])
      k.forEach(e=>{
        const i = e as FirebaseUSSDInquiry
        this.phoneNumbers.filter(k=> {
          if(k.number! == i.device!) {
            k.defaultUSSDReply! = i.reply!
          }
          if(k.number! == i.device!) {
            k.defaultUSSDStatus! = i.myStatus!
          }
        })
      })
    });
  }


  //button clicks
  actionCopyToSelected(event: any) {
    var v=0
    this.phoneNumbers.forEach(i=>{
      v += 1
      if(i.isDisabled == false) {
        const selected = this.ussds[0].ussd as string
        this.phoneNumbers.forEach(e=>{
          if (e.number!+v == i.number!+v) {
              e.ussdCodeToSend = selected
          }
        })
        console.log("passeddd")
      }
      else {
        this.phoneNumbers.forEach(e=>{
          if (e.number!+v == i.number!+v) {
              e.ussdCodeToSend = ""
          }
        })
        console.log("falikeddd")
      }
    })
  }
  
  actionClearAll(event: any) {
    var v=0
    this.phoneNumbers.forEach(e=>{
      v += 1
      if (e.number!+v == e.number!+v) {
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
      // const isEmpty = selectedNumbs.filter(e=>e.ussdCodeToSend! == "")
      // if(isEmpty.length >= 0) {
      //   Toaster.failureToast("FAILURE","USSD Code are required!")
      //   return
      // }
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
        const k : FirebaseUSSDInquiry = {
          device: e.number!,
          reply: "Waiting for Reply",
          myStatus: "Sending",
          code: e.ussdCodeToSend!,
          type: selectedResponseValue
        }
        this.ussdInquires.push(k)
      })

      
      const docRef = await setDoc(doc(db, "InquiryCall", "opcode_"+this.selectedOPcode), {
          devices: this.ussdInquires
      });
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
      var i = 0
      this.apiService.getlistofDevicesForOperator(opcode).subscribe(
        e=> {
          this.phoneNumbers = [];
          const d = e.http_response as DevicesMatchingOperator[]
          console.log(d)
          d.forEach(e=>{
            i+= 1
            e.number! += i
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

