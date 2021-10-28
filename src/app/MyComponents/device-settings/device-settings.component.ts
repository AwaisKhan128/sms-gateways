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

  actionEditSlot(content: any, index: number) {
    this.selectedRowIndex = index
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  actionEditNumber(content: any, index: number) {
    this.selectedRowIndex = index
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  callUpdateAPI() {
    let d : device_list_details = device_list_details![this.selectedRowIndex] as device_list_details
    let sid = d//.id! as number
    //et sslot = device_list_details[this.selectedRowIndex].slot as number
    //let simei = device_list_details[this.selectedRowIndex].imei
    //let snumber = device_list_details[this.selectedRowIndex].number
    //this.free_api.update_balance_sloy(sid,snumber,sslot,simei)
    console.log(d.id)
    //console.log(sslot)
    //console.log(simei)
    //console.log(snumber)
  }

  async commitToFirebase(id:string, imei:string,number:string,slot:string) {
    try {
      
      // Add a new document in collection "cities"
      const docRef = await setDoc(doc(db, "RemoteMessages", "ds_"+id+"_"+imei), {
        id: id,
        imei: imei,
        number: number,
        slot: slot,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
