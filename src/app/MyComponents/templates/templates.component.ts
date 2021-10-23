import { Toaster_Service } from './../../Classes/ToasterNg';
import { empty } from 'rxjs';
import { View_sms_list, View_sms_template_data } from './../../Classes/sms_templates';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { create_sms_template, View_sms_template, View_sms_template1 } from 'src/app/Classes/sms_templates';
import * as $ from 'jquery';
import { ToastNotificationInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { ProgressComponentComponent } from '../progress-component/progress-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  closeResult: string | any;
  number: any;
  title: any;
  message: any;

  u_title: any;
  u_message: any;
  View_sms_template: View_sms_template | any;
  View_sms_template1: View_sms_template1 | any;
  View_sms_template_data: View_sms_template_data[] | any;
  window: any["$"] = $;


  template_list: View_sms_list[] | any;
  template_list_spec: View_sms_list[] | any;


  data: any;

  constructor(private modalService: NgbModal, private freeAPI: API_Services,private Snake_Wait:Snake_Waiting) {

  }

  ngOnInit(): void {
    this.Snake_Wait.start_bar("Please Wait");
    // snackBarRef._open();
    let json = localStorage.getItem("user_data");
    if(json!=null)
    {
      this.data = JSON.parse(json);
      let username = this.data.username;
      let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

      // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);

      this.freeAPI.get_sms_templates(auths)
        .subscribe
        (
          res => {
            var data = JSON.parse(JSON.stringify(res));
            this.View_sms_template = data;
            this.View_sms_template1 = data.data;
            this.View_sms_template_data = data.data.data;
            this.template_list = data.data.data;
            this.template_list_spec = data.data.data;


            this.template_list?.forEach((_element: any) => {
              _element.active = false;

            });

            // console.log(this.template_list.length);
            if (this.template_list.length==0 ) {
              $('#delete_it').prop('disabled', true);
            }
            else {
              $('#delete_it').prop('disabled', false);

            }
            this.Snake_Wait.close_bar();



            // alert(a.response_msg);
          },
          err => {
            var a = JSON.parse(JSON.stringify(err));
            this.Snake_Wait.close_bar();
            // alert(a.response_msg);
          }
        )
    }

    // Listen for click on toggle checkbox



  }

  Checked_All() {

    if ($(':checkbox').prop('checked')) {
      //blah blah
      $(':checkbox').prop('checked', true);
      this.template_list.forEach((_element: any) => {
        _element.active = true;

      });
      console.log(this.template_list);

    }
    else {

      $(':checkbox').prop('checked', false);

      this.template_list.forEach((_element: any) => {
        _element.active = false;

      });
      console.log(this.template_list);
    }


  }



  submit_Template() {

    let head = this.title;
    let body = this.message;

    let JSON_Body = new create_sms_template();
    JSON_Body.template_name = head;
    JSON_Body.body = body;
    this.Snake_Wait.start_bar('Please Wait');

    let json = localStorage.getItem("user_data");
    if(json!=null)
    {
      this.data = JSON.parse(json);
      let username = this.data.username;
      let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

      // var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');

      this.freeAPI.create_sms_template(auths, JSON_Body)
        .subscribe
        (
          res => {
            var a = JSON.parse(JSON.stringify(res));
            // alert(a.response_msg);
            Toaster_Service.toastNotification_S(a.response_msg);
            this.modalService.dismissAll();

            this.Snake_Wait.close_bar();

          },
          err => {
            var a = JSON.parse(JSON.stringify(err));
            Toaster_Service.toastNotification_D(a.response_msg);
            this.Snake_Wait.close_bar();


            // alert(a.response_msg);

          }
        )
    }

  }
  delete_template(delete1: any) {
    this.modalService.open(delete1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  Cancel_Auth() {
    this.template_list.forEach((element: any) => {
      this.Snake_Wait.start_bar("Please Wait!");

      let json = localStorage.getItem("user_data");
      if(json!=null)
      {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

        // var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');

        if (element.active == true) {
          this.freeAPI.remove_sms_templates(auths, element.template_id)
            .subscribe
            (
              res => {
                console.log(res);
                this.Snake_Wait.close_bar();
                Toaster_Service.toastNotification_S("Success");
                this.modalService.dismissAll();



              },
              err => {
                console.log(err);
                this.Snake_Wait.close_bar();
                Toaster_Service.toastNotification_D("Failed");

              }
            )
        }

      }


    });
  }

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


  OnCheckBoxClicked(out: any) {
    const index = this.template_list.indexOf(out);
    this.template_list[index].active = !this.template_list[index].active
    console.log(this.template_list);
  }

  // nG-Bootstrap
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



  update_templates(content:any)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log($(result));
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  update_Template()
  {

    let title = this.u_title;
    let message = this.u_message;

    let count = 0;

    this.template_list.forEach((_element: any) => {
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
      let template_id = 0;

      this.template_list.forEach((_element: any) => {
        if(_element.active)
        {
          template_id = _element.template_id;
        }
  
      });
      if(json!=null)
      {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
        let json_data = {template_name:title, body:message};
  
        // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
  
        this.freeAPI.update_sms_tempalte(auths,json_data,template_id)
          .subscribe
          (
            res => {
              var data = JSON.parse(JSON.stringify(res));
              Toaster_Service.toastNotification_S(data.response_msg);
              this.modalService.dismissAll();
              this.Snake_Wait.close_bar();
  
              // alert(a.response_msg);
            },
            err => {
              var a = JSON.parse(JSON.stringify(err));
              Toaster_Service.toastNotification_D(a.response_msg);
              this.Snake_Wait.close_bar();

              // alert(a.response_msg);
            }
          )
      }
    }



  }

  TemplatesByPageno(event:any)
  {
    let json = localStorage.getItem("user_data");
    if(json!=null)
    {
      this.data = JSON.parse(json);
      let username = this.data.username;
      let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
      console.log(event.pageIndex,event.pageSize)

      // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);

      this.freeAPI.get_sms_templates_by_Num(auths,event.pageIndex,event.pageSize)
        .subscribe
        (
          res => {
            var data = JSON.parse(JSON.stringify(res));
            this.View_sms_template = data;
            this.View_sms_template1 = data.data;
            this.View_sms_template_data = data.data.data;
            this.template_list = data.data.data;
            this.template_list_spec = data.data.data;


            this.template_list?.forEach((_element: any) => {
              _element.active = false;

            });

            // console.log(this.template_list.length);
            if (this.template_list.length==0 ) {
              $('#delete_it').prop('disabled', true);
            }
            else {
              $('#delete_it').prop('disabled', false);

            }



            // alert(a.response_msg);
          },
          err => {
            var a = JSON.parse(JSON.stringify(err));
            // alert(a.response_msg);
          }
        )
    }

  }

}
