import { get_contact_list, get_contact_list1, get_contact_list2 } from './../../Classes/manage_contacts';
import { Component, OnInit } from '@angular/core';
import { ToastNotificationInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { Create_Contact_List } from 'src/app/Classes/manage_contacts';
import { Toaster_Service } from 'src/app/Classes/ToasterNg';
import * as $ from 'jquery';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  closeResult: string='';
  List_name :any;
  List_name_u :any;
  window: any["$"] = $;


  Create_Contact_List:Create_Contact_List|any;

  get_contact_list:get_contact_list|any;
  get_contact_list1:get_contact_list1|any;
  get_contact_list2:get_contact_list2[]|any;


  Create_List()
  {
    let list_name = this.List_name;
    if (list_name!=null||undefined||'')
    {
      let json = localStorage.getItem("user_data");

          // if(json!=null)
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

      var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');

      const body = {'list_name':list_name};

      this.freeAPI.create_contact_list(auths,body)
      .subscribe(
        res=>{
          let data = JSON.parse(JSON.stringify(res));
          this.Create_Contact_List = data;
          this.modalService.dismissAll();
          Toaster_Service.toastNotification_S(this.Create_Contact_List.response_msg);

          // console.log(res);
        },
        err=>
        {
          // alert(err);
          console.log(err.response_msg);
          Toaster_Service.toastNotification_D(err.response_msg);

        }
      )
    }

    }
  }

  Update_List()
  {

   let id = $('#selected_list').val()
    let list_name_u = this.List_name_u;
    if (list_name_u!=null||undefined||'')
    {
      let json = localStorage.getItem("user_data");

          // if(json!=null)
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

      var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');

      const body = {'list_name':list_name_u};

      this.freeAPI.update_contact_list(auths,body,id)
      .subscribe(
        res=>{
          let data = JSON.parse(JSON.stringify(res));
          this.Create_Contact_List = data;
          this.modalService.dismissAll();
          Toaster_Service.toastNotification_S(this.Create_Contact_List.response_msg);

          // console.log(res);
        },
        err=>
        {
          // alert(err);
          console.log(err.response_msg);
          Toaster_Service.toastNotification_D(err.response_msg);

        }
      )
    }

    }

  }





  C_Contact(content: any) {
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


  constructor(private modalService: NgbModal, private freeAPI: API_Services) { }

  ngOnInit(): void {
let json = localStorage.getItem("user_data");

    // if(json!=null)
{
// this.data = JSON.parse(json);
// let username = this.data.username;
// let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
// var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');


this.freeAPI.get_contact_list(auths)
.subscribe(
  res=>{
    let data = JSON.parse(JSON.stringify(res));
    this.get_contact_list = data;
    this.get_contact_list1 = data.data;
    this.get_contact_list2 = data.data.data;

    // this.modalService.dismissAll();
    Toaster_Service.toastNotification_S(data.response_msg);

    // console.log(res);
  },
  err=>
  {
    // alert(err);
    console.log(err.response_msg);
    Toaster_Service.toastNotification_D(err.response_msg);

  }
)
}
  }

}
