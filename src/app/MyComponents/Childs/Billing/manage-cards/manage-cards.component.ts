import { get_card_details, get_card_details1 } from './../../../../Classes/transactions';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';




// Import from library
import {
  ConfirmBoxConfigModule,
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  ToastNotificationInitializer,
} from '@costlydeveloper/ngx-awesome-popup';
 

import{
  MatDialog,MatDialogConfig,MatDialogModule
}from '@angular/material/dialog'



@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

  number: any;
  cvc: any;
  name: any;
  date: any;
  b_name: any;
  window: any["$"] = $;


  data: any;
  closeResult = '';

  get_card_details: get_card_details | any;
  get_card_details1: get_card_details1 | any;

  constructor(private freeAPI: API_Services,private dialog:MatDialog,private MatDialogModule:MatDialogModule
    ,private modalService: NgbModal) { }

  ngOnInit(): void {
    let json = localStorage.getItem("user_data");
    if (json != null) {
      this.data = JSON.parse(json);
      let username = this.data.username;
      let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode(username + ":" + password);
      9
      this.freeAPI.get_card_details(auths)
        .subscribe(
          res => {
            let data = JSON.parse(JSON.stringify(res));
            this.get_card_details = data;
            this.get_card_details1 = data.data;
            // console.log(this.get_card_details);

          },
          err => {
            alert(err);
            // console.log(err);

          }
        )
    }
  }
  public receive_card_details() {


  }

  public update_card() {

    this.angular_mat();

  }

  public angular_mat()
  {


    this.toastNotification();
    
    // dialogRef.close('Pizza!');
  }

  // Create the method
  toastNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('Warning!');
    newToastNotification.setMessage('Form is not valid!');

    // Choose layout color type
    newToastNotification.setConfig({
      LayoutType: DialogLayoutDisplay.WARNING // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    // Simply open the toast
    newToastNotification.openToastNotification$();
  }

  

  



    // nG-Bootstrap
    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log($(result));
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  

}
