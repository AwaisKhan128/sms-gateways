import { get_card_details, get_card_details1, card_info } from './../../../../Classes/transactions';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';





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
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

  number: any;
  number_u: any;


  cvc: any;
  name: any;
  date_month: any;
  date_year: any;


  b_name: any;

  cvc_u: any;
  name_u: any;
  date_u: any;
  b_name_u: any;

  window: any["$"] = $;


  data: any;
  closeResult = '';

  get_card_details: get_card_details | any;
  get_card_details1: get_card_details1 | any;

  constructor(private freeAPI: API_Services,private dialog:MatDialog,private MatDialogModule:MatDialogModule
    ,private modalService: NgbModal) { 
      
      

    }

  ngOnInit(): void {
    let json = localStorage.getItem("user_data");
    // if (json != null) 
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');
      
      this.freeAPI.get_card_details(auths)
        .subscribe(
          res => {
            let data = JSON.parse(JSON.stringify(res));
            this.get_card_details = data;
            this.get_card_details1 = data.data;
            // console.log(this.get_card_details);

          },
          err => {
            let a = JSON.parse(JSON.stringify( err))
            console.log(a.error.response_code);
            // alert(a.error.response_code);
            // if(a.error.data == null)
            // {
            //   $('#update_card').prop('disabled', true);

            // }
            // else{
            //   $('#update_card').prop('disabled', false);

            // }

            // console.log(err);

          }
        )
    }
  }
  public receive_card_details() {
    let json = localStorage.getItem("user_data");

    // if (json != null) 
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');
      let cards = new card_info();
      cards.bank_name = this.b_name;
      cards.cvc = this.cvc;
      cards.name = this.name;
      cards.number = this.number;
      cards.expiry_month = this.date_month;
      cards.expiry_year = this.date_year;

      
      this.freeAPI.update_payment_info(auths,cards)
        .subscribe(
          res => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(res);
            // alert(data.response_code);

            // console.log(this.get_card_details);

          },
          err => {
            let a = JSON.parse(JSON.stringify( err))
            console.log(a.error.response_msg);
            this.angular_mat(a.error.response_msg);

            // alert(a.error.response_msg);
            if(a.error.data == null)
            {
              $('#update_card').prop('disabled', true);

            }
            else{
              $('#update_card').prop('disabled', false);

            }

            // console.log(err);

          }
        )
    }

  
  }
  dateInput(value:any)
  {
    var date = new Date(value);
    var month = date.getMonth();
    var year = date.getFullYear();

    this.date_month = month+1;
    this.date_year = year;

    // console.log(month,year);
  }

  public update_card() {


  }
  

  public angular_mat(val:any)
  {
    this.toastNotification_E(val);
    // dialogRef.close('Pizza!');
  }

  // Create the method
  toastNotification_E(val:any) {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('Error!');
    newToastNotification.setMessage(val);

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
