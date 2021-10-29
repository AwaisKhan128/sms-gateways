import { devices_list, device_list_details } from './../../Classes/devices_list';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditslotDevicesettingComponent } from '../Childs/editslot-devicesetting/editslot-devicesetting.component';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, setDoc, doc, getFirestore } from "firebase/firestore"; 
import { HTTPResponseSubscribedDevices } from 'src/app/Classes/subscribed_devices';
import { HTTPResponseSubscribedDeviceSim } from 'src/app/Classes/subscribed_devices_sim';
import { Toaster } from 'src/app/Helper/toaster';
import { Toaster_Service } from 'src/app/Classes/ToasterNg';



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
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.css']
})
export class DeviceSettingsComponent implements OnInit {
  name = 'Angular';
  enableEdit = false;
  enableEditIndex = null;
  window: any["$"] = $;
  data: any;
  messageFrom :any;
  messageTo :any;

  closeResult: string='';
  selectedRowIndex : number = 0
  thisWasSelectedToUpdateDevice : devices_list | undefined;

  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }




  // ----------------------->
  show = 'A';
  popup:any;


  devices_list : devices_list[]|any;
  device_list_details: device_list_details[]|any;
  imei!: string
  number!: string
  id!: string
  slot!: string


  constructor(private free_api: API_Services,public router: Router, private modalService: NgbModal) {    
  }

  ngOnInit(): void {

    let json = localStorage.getItem("user_data");
    let json1 = localStorage.getItem("user_status");


    if (json1!=null)
    {
      if(json!=null)
      {
  
        this.data = JSON.parse(json);
  
  
        // let username = this.data.username;
        // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
  
        // let username = myCredentials.username;
        // let password = ( myCredentials.password);
        // let auth = EncodeDecode.b64EncodeUnicode(username+':'+password)
  
        {
          let auth_id = this.data.id;
        
  
          this.free_api.get_subscribe_devices(auth_id)
          .subscribe
          (
            res=>
            {
                let data = JSON.parse(JSON.stringify(res));
                this.devices_list = data.http_response;
                
  
            },
            err=>
            {
              console.log(err);
            }
          )
    
          this.free_api.get_subscribe_devices_details(auth_id)
          .subscribe
          (
            res=>
            {
                let DATA = JSON.parse(JSON.stringify(res));
                this.device_list_details = DATA.http_response;

                this.device_list_details?.forEach((element: { id: string; imei: string; }) => {
                  this.id = element?.id;
                  this.imei = element?.imei
                });
                
    
                // let hidden_info = 
            },
            err=>
            {
                console.log(err);
            }
          )
        }
        
  
  
        
  
      }

    }
    else
    {
      this.router.navigate(['./'])
    }



  }


  filterby(id:any)
  {
    this.free_api.get_subscribe_devices_details(id)
    .subscribe
    (
      res=>
      {
          let DATA = JSON.parse(JSON.stringify(res));
          this.device_list_details = DATA.http_response;

          // let hidden_info = 
      },
      err=>
      {
          console.log(err);
      }
    )

  }

  

  showupdate_sim(event:any)
  {
    console.log(event);

  }

  sim(event:any)
  {
    console.log(event);
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  actionEditSlot(content: any, index: number, imei: string, number: string, id: string, slot: string) {
    this.selectedRowIndex = index
    this.imei = imei
    this.number = number
    this.id = id
    this.slot = slot
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  actionEditNumber(content: any, index: number, imei: string, number: string, id: string, slot: string) {
    this.selectedRowIndex = index
    this.imei = imei
    this.number = number
    this.id = id
    this.slot = slot
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  callUpdateAPI() {
    // var body = 
    // {
    //   "id": this.id,
    //   "number":this.number,
    //   "slot":this.slot,
    //   "imei":this.imei
    // }

    


    // console.log(this.messageFrom,this.messageTo);

    if((this.messageFrom)==undefined)
    {
      let number:string|any = $("#messageFrom").attr('placeholder');
      // console.log("number is undefined");
      this.free_api.update_balance_sloy(this.id,number
        ,this.messageTo,this.imei)
        .subscribe(
            res=>
            {
              console.log(res);
              Toaster_Service.toastNotification_S("Success");
              this.commitToFirebase(this.id,this.imei,number,this.messageTo) ;
              
            },
            err=>
            {
              console.log("Error due to = "+err);
              Toaster_Service.toastNotification_D("Failed");

            }
  
      )
    }

    if((this.messageTo)==undefined)
    {
      let slot:string|any = $("#messageTo").attr('placeholder');

      this.free_api.update_balance_sloy(this.id,this.messageFrom
        ,slot,this.imei)
        .subscribe(
            res=>
            {
              console.log(res);
              Toaster_Service.toastNotification_S("Success");

              this.commitToFirebase(this.id,this.imei,this.messageFrom,slot)
               ;
              
            },
            err=>
            {
              Toaster_Service.toastNotification_D("Failed");

              console.log("Error due to = "+err);
            }
  
      )
    }

    
  }

  async commitToFirebase(id:string, imei:string,number:string,slot:string) {
    try {
      
      // Add a new document in collection "cities"
      const docRef = await setDoc(doc(db, "DeviceSetting", "ds_"+id), {
        id: id,
        imei: imei,
        number: number,
        slot: slot,
      });
      this.modalService.dismissAll();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
