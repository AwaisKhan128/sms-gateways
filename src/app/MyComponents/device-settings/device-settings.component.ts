import { devices_list, device_list_details } from './../../Classes/devices_list';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditslotDevicesettingComponent } from '../Childs/editslot-devicesetting/editslot-devicesetting.component';






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

  actionEditSlot(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  actionEditNumber() {
    
  }

}
