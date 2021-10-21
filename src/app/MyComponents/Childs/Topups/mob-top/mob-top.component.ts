import { Snake_Waiting } from './../../../../Classes/Waiting_bar';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { Toaster_Service } from './../../../../Classes/ToasterNg';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';


@Component({
  selector: 'app-mob-top',
  templateUrl: './mob-top.component.html',
  styleUrls: ['./mob-top.component.css']
})
export class MobTopComponent implements OnInit {
  number:any;
  amount:any;
  closeResult: string='';
  type:any=1;
  window: any["$"] = $;

  constructor(private modalService: NgbModal,private freeapi: API_Services,private Snake_Wait:Snake_Waiting) { }

  ngOnInit(): void {
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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


  submit_requests()
  {
    let number = this.number;
    let amount = this.amount;
    this.Snake_Wait.start_bar("Processing");

    if (number != (null || undefined || '')  && amount != (null || undefined || ''))
    {

     let id = Math.floor(100000 + Math.random() * 900000);
     let json = localStorage.getItem("user_data");
     if (json!=null)
     {
       let response = JSON.parse(json);
       let user_id = response.id;
        let body = 
        {
          user_id:user_id,
          id : id,
          number:number,
          amount:amount
        }
        this.freeapi.send_recharge_request(number,amount,this.type,id)
        .subscribe
        (
          res=>
          {
            this.Snake_Wait.close_bar();
            let resp = ((res));
            console.log(resp);
            Toaster_Service.toastNotification_S("Success");
          },
          err=>
          {
            this.Snake_Wait.close_bar();
            let resp = ((err));
            console.log("Error due: "+resp);
          }
        )

      //  this.freeapi.topup_request(body)
      //  .subscribe
      //  (
      //    res=>
      //    {
      //     let resp = JSON.parse(JSON.stringify(res));
      //     Toaster_Service.toastNotification_S("Request has been Successful");
      //    },
      //    err=>
      //    {
      //     Toaster_Service.toastNotification_D("Failed");
      //     console.log(err);
      //    }
      //  )

       
     }


    }
    else{
      Toaster_Service.toastNotification_D('Empty Inputs');
    }
  }


  type_select()
  {
    this.type = $('#selected').val();
  }

}
