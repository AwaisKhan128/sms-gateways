import { Toaster_Service } from './../../../../Classes/ToasterNg';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';
import { operators_get_list } from 'src/app/Classes/operators_get_list';
import * as $ from 'jquery';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';



@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  closeResult: string|any;
  u_title : any;
  u_message :any;
  title : any;
  message :any;
  alloperators:any[] | undefined;
  operator_list: operators_get_list[]|any;
  window: any["$"] = $;
  data: any;


  
  


  constructor(private modalService: NgbModal, private freeAPI: API_Services,private Snake_Wait:Snake_Waiting) { }

  ngOnInit(): void {
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



  delete_template(delete1: any) {
    this.modalService.open(delete1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  update_templates(content:any)
  {
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

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  update_Template()  // remain
  {

    let title = this.u_title;
    let message = this.u_message;

    let count = 0;

    this.operator_list.forEach((_element: any) => {
      if(_element.active)
      {
        count++;
      }

    });



    if (count<1)
    {
      Toaster_Service.toastNotification_I('Need to select one!')
    }
    else if (count > 1)
    {
      Toaster_Service.toastNotification_I('Update could only apply to one!');

    }
    else if (count ==1 ){
      this.Snake_Wait.start_bar("Please wait");
      let json = localStorage.getItem("user_data");
      let operator_id = 0;

      this.operator_list.forEach((_element: any) => {
        if(_element.active)
        {
          operator_id = _element.id;
        }
  
      });
      if(json!=null)
      {
        this.data = JSON.parse(json);
        // let username = this.data.username;
        // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
        
        const json_data = 
        {
          operator_name:title,
          operator_code:message
        };
        
  
        // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
  
        this.freeAPI.update_operator(json_data,operator_id)
          .subscribe
          (
            res => {
              var data = JSON.parse(JSON.stringify(res));
              Toaster_Service.toastNotification_S(data.http_response);
              console.log(json_data);
              console.log(data);
              console.log(operator_id);

              this.Snake_Wait.close_bar();
              location.reload();

  
              // alert(a.response_msg);
            },
            err => {
              var a = JSON.parse(JSON.stringify(err));
              Toaster_Service.toastNotification_D(a.http_response);
              this.Snake_Wait.close_bar();

              // alert(a.response_msg);
            }
          )
      }
    }

  }

  Cancel_Auth()  // Remain
  {
    let count = 0;
    this.operator_list.forEach((_element: any) => {
      if(_element.active)
      {
        count++;
      }

    });



    if (count<1)
    {
      Toaster_Service.toastNotification_I('Need to select one!')
    }
    else if (count > 1)
    {
      Toaster_Service.toastNotification_I('Delete could only apply to one!');

    }
    else if (count ==1 ){
      this.Snake_Wait.start_bar("Please wait");
      let json = localStorage.getItem("user_data");
      let operator_id = 0;

      this.operator_list.forEach((_element: any) => {
        if(_element.active)
        {
          operator_id = _element.id;
        }
  
      });
      if(json!=null)
      {
        // let username = this.data.username;
        // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
        
        // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
  
        this.freeAPI.delete_operator(operator_id)
          .subscribe
          (
            res => {
              var data = JSON.parse(JSON.stringify(res));
              Toaster_Service.toastNotification_S(data.http_response);
              this.Snake_Wait.close_bar();
              location.reload();

  
              // alert(a.response_msg);
            },
            err => {
              var a = JSON.parse(JSON.stringify(err));
              Toaster_Service.toastNotification_D(a.http_response);
              this.Snake_Wait.close_bar();

              // alert(a.response_msg);
            }
          )
      }
    }
  }

  submit_Template() //Remain
  {

    let title = this.title;
    let code  = this.message;
    let body = 
    {
      name:title,
      code:code
    }

    this.freeAPI.create_operator(body)
    .subscribe
    (
      res=>
      {
        let data = JSON.parse(JSON.stringify(res));
        Toaster_Service.toastNotification_S(data.http_response);

      },
      err=>
      {
        Toaster_Service.toastNotification_D('Failed to create operator');
        console.log(err);

      }

    )


  }

  OnCheckBoxClicked(out:any) // Remain
  {
    const index = this.operator_list.indexOf(out);
    this.operator_list[index].active = !this.operator_list[index].active  
    
    console.log(this.operator_list);
  }


  Checked_All() // Remain
  {
    if ($(':checkbox').prop('checked')) {
      //blah blah
      $(':checkbox').prop('checked', true);
      this.operator_list.forEach((_element: any) => {
        _element.active = true;

      });
      console.log(this.operator_list);

    }
    else {

      $(':checkbox').prop('checked', false);

      this.operator_list.forEach((_element: any) => {
        _element.active = false;

      });
      console.log(this.operator_list);
    }
  }
}
