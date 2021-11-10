import { operators_get_list } from 'src/app/Classes/operators_get_list';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { Toaster_Service } from 'src/app/Classes/ToasterNg';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';
import * as $ from 'jquery';


@Component({
  selector: 'app-add-sms-inquiry',
  templateUrl: './add-sms-inquiry.component.html',
  styleUrls: ['./add-sms-inquiry.component.css']
})
export class AddSMSInquiryComponent implements OnInit {
  alloperators:any[] | undefined;
  operator_list: operators_get_list[]|any;
  window: any["$"] = $;

  // -----Data------

  opcode:any;
  ussd_code:any;
  sms_num:any;
  sms_code:any;
  rec_form:any;
  max_inq:any;
  // ---------------


  constructor(private modalService: NgbModal, private freeAPI: API_Services,private Snake_Wait:Snake_Waiting) { }

  ngOnInit(): void {
    this.populate_operators();
  }


  populate_operators()
  {
    this.opcode = $('#list_selected').val();
    console.log(this.opcode);
    $('#sms_code').attr("disabled","disabled")
    $('#sms_num').attr("disabled","disabled")
    $('#ussd_code').removeAttr("disabled")
    this.Snake_Wait.start_bar("Please Wait")
    this.freeAPI.getlistofOperators()
    .subscribe
    (
      res=>
      {
        this.Snake_Wait.close_bar();
        let data = JSON.parse(JSON.stringify(res));
        this.alloperators = data.http_response;
        this.operator_list = data.http_response;
        // console.log(data.http_response.length);
        Toaster_Service.toastNotification_S("Loaded Complete");
      },
      err=>
      {
        this.Snake_Wait.close_bar();
        Toaster_Service.toastNotification_D('Fetching Error');
        console.log(err);
      }
    )
  }



  get_mode()
  {
    let val = $('#select_mode').val();
    console.log(val);

    if (val=='0'||0)
    {
      $('#sms_code').attr("disabled","disabled")
      $('#sms_num').attr("disabled","disabled")
      $('#ussd_code').removeAttr("disabled")

      

    }
    else
    {
      $('#sms_code').removeAttr("disabled")
      $('#sms_num').removeAttr("disabled")
      $('#ussd_code').attr("disabled","disabled")


    }
  }

  save(event:any)
  {
    let json = {
      operator_code:this.opcode,
      ussd:this.ussd_code,
      sms_number:this.sms_num,
      sms:this.sms_code,
      receive_format:this.rec_form,
      max_inquiry:this.max_inq,
      mode:'0'
    }

    let json1 = {
      ussd:this.ussd_code,
      sms_number:this.sms_num,
      sms:this.sms_code,
      receive_format:this.rec_form,
      max_inquiry:this.max_inq,
      mode:'0'
    }
    if (event=='create_it')
    {
      this.freeAPI.create_balance_inquiry(json)
      .subscribe
      (
        res=>
        {
          let data = JSON.parse(JSON.stringify(res));
          Toaster_Service.toastNotification_S(data.http_response);
          location.reload();

        },
        err=>
        {
          let data = JSON.parse(JSON.stringify(err));
          Toaster_Service.toastNotification_D(data.http_response);
          console.log(data);
        }
      )

    }
    else if (event=='update_it')
    {
      this.freeAPI.update_balance_inquiry(json1,this.opcode)
      .subscribe
      (
        res=>
        {
            let data = JSON.parse(JSON.stringify(res));
            Toaster_Service.toastNotification_S(data.http_response);
            location.reload();

        },
        err=>
        {
          let data = JSON.parse(JSON.stringify(err));
          Toaster_Service.toastNotification_D(data.http_response);
          console.log(data.http_response);
        }
      )
    }


  }

  select_opcode()
  {
    this.opcode = $('#list_selected').val();
    console.log(this.opcode)
  }


}
