import { Permission, Permission_Sample } from 'src/app/Classes/Permissions';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { myCredentials } from 'src/app/APIS/APIConfig';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { Countries } from 'src/app/Classes/getCountries';
import { Country_Data } from 'src/app/Classes/getCountry_Data';
import { Create_Reseller } from 'src/app/Classes/Resellers';
import { Toaster_Service } from 'src/app/Classes/ToasterNg';
import * as $ from 'jquery';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-resellers',
  templateUrl: './resellers.component.html',
  styleUrls: ['./resellers.component.css']
})
export class ResellersComponent implements OnInit {
  countries:Countries[]|any;
  contries_data: Country_Data[]|undefined;
  closeResult: string='';
  window: any["$"] = $;
  get_permissions : Permission[]|any;
  get_permissions_sample : Permission_Sample[]|any;

  Resend_Email()
  {
        
    let count_active = 0;

    if(this.get_permissions_sample!=null||undefined)
    {
    this.get_permissions_sample.forEach((element: { active: any; }) => {
      if(element.active)
      {
        count_active++;
      }

    });


    if(count_active>1)
    {
      Toaster_Service.toastNotification_I('Update could only apply for one!');
    }
    else if (count_active<1)
    {
      Toaster_Service.toastNotification_I('Need to select atleast one!')
    }

    else{

      let email = ''
      let user = '';
      let api = '';


      this.get_permissions_sample.forEach((element: { active: any; email: string; username: string; api_key: string; }) => {
        if(element.active)
        {
          email =  element.email;
          user = element.username;
          api = '';
        }
  
      });

      {
          let json = localStorage.getItem("user_data");  
          
  
          {
          // if(json!=null)
          {
          // this.data = JSON.parse(json);
          // let username = this.data.username;
          // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
          
    
  
          this.freeapi.send_email_credential_admin(email,user,api)
          .subscribe
          (
            data=>
            {
              let resp_data= JSON.parse(JSON.stringify(data));
              Toaster_Service.toastNotification_S(resp_data.response_msg);
              this.modalService.dismissAll();

            },

            err=>
            {
              console.log(err);
              Toaster_Service.toastNotification_D(err);
            }
          )
          }
    
          }
      
        }
    }

    }
    else
    {
      Toaster_Service.toastNotification_I('Must select one!');
    }
  }


  

  constructor(private freeapi : API_Services
    ,private modalService: NgbModal,public create_Reseller:Create_Reseller,public permission:Permission) { }

  ngOnInit(): void {
    let json = localStorage.getItem("user_data");

    // if(json!=null)
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
  
      // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
      
      this.freeapi.retrieve_Acc_permissionsALL("reseller")
      .subscribe
      (
        res=>
        {
          let resp = JSON.parse(JSON.stringify(res));
          this.get_permissions = resp.http_response;
          this.get_permissions_sample = resp.http_response;

          this.get_permissions_sample.forEach((element: { active: boolean; }) => {
            element.active = false;
          });

          console.log(this.get_permissions_sample);

          Toaster_Service.toastNotification_S("Success!");
        },
        err=>
        {
          let resp = JSON.parse(JSON.stringify(err));
          console.log(resp);
          Toaster_Service.toastNotification_D("Failed");

        }
      )
  
    }


  }


  public C_Admin(content:any)
  {
    this.freeapi.getCountriess()
    .subscribe(
      data=>{
        this.countries = data;
        this.contries_data = data.data;
      }

    )
    {

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log($(result));
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }
  getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  Create_Reseller_Now()
  {
    let json = localStorage.getItem("user_data");
    let country = $('#selects_country').val();
    this.create_Reseller.country = country;
    
    console.log(this.create_Reseller);
    // if(json!=null)
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
  
      // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
      
      this.freeapi.create_reseller(this.create_Reseller)
      .subscribe
      (
        data=>
        {
          let data_resp = JSON.parse(JSON.stringify(data));
          console.log(data_resp);
          Toaster_Service.toastNotification_S(data_resp.response_msg)

          this.freeapi.send_email_credential_admin(data_resp.data.user_email
            ,data_resp.data.username,this.create_Reseller.password)
          .subscribe
          (
            data=>
            {
              let resp_data= JSON.parse(JSON.stringify(data));
              Toaster_Service.toastNotification_S(resp_data.response_msg);
              this.permission.id = data_resp.data.user_id;
              this.permission.username = data_resp.data.username;
              this.managing_permissions();
    
    
              this.freeapi.push_Acc_permissions("reseller",this.permission)
              .subscribe(
                res=>
                {
                  let data_resp = JSON.parse(JSON.stringify(res));
                  console.log(data_resp);
                  Toaster_Service.toastNotification_S(data_resp.http_response);
                  this.modalService.dismissAll();
    
                },
                err=>
                {
                  let err_resp = JSON.parse(JSON.stringify(err));
                  console.log(err_resp);
                  Toaster_Service.toastNotification_D(err_resp.http_response);
                }
              )
              

            },

            err=>
            {
              console.log(err);
              Toaster_Service.toastNotification_D(err);
            }
          )



        },
        res=>
        {
          console.log(res);
        }

      )
  
    }
  }


  managing_permissions()
  {
    if ($('#Access_SMS'+':checkbox').prop('checked')) {
                          
      this.permission.access_sms = 1;
    }
    else if ($('#Access_SMS'+':checkbox').prop('checked')==false) {
                          
      this.permission.access_sms = 0;
    }

    if ($('#Access_MMS'+':checkbox').prop('checked')) {
      
      this.permission.access_mms = 1;
    }
    else if ($('#Access_MMS'+':checkbox').prop('checked')==false) {
                          
      this.permission.access_mms = 0;
    }

    if ($('#Access_Contact'+':checkbox').prop('checked')) {
      
      this.permission.access_contacts = 1;
    }
    else if ($('#Access_Contact'+':checkbox').prop('checked')==false) {
      this.permission.access_contacts = 0;
    }

    if ($('#access_templates'+':checkbox').prop('checked')) {
      this.permission.access_templates = 1;
    }
    else if ($('#access_templates'+':checkbox').prop('checked')==false) {                   
      this.permission.access_templates = 0;
    }

    if ($('#access_billing'+':checkbox').prop('checked')) {
      this.permission.access_billing = 1;
    }else if ($('#access_billing'+':checkbox').prop('checked')==false) {          
      this.permission.access_billing = 0;
    }

    if ($('#access_resellers'+':checkbox').prop('checked')) {
      this.permission.access_resellers = 1;
    }else if ($('#access_resellers'+':checkbox').prop('checked')==false) {                     
      this.permission.access_resellers = 0;
    }

    if ($('#mobile_topup'+':checkbox').prop('checked')) {
      this.permission.mobile_topup = 1;
    }else if ($('#mobile_topup'+':checkbox').prop('checked')==false) {               
      this.permission.mobile_topup = 0;
    }

    if ($('#sms_campaign'+':checkbox').prop('checked')) {     
      this.permission.sms_campaign = 1;
    }else if ($('#sms_campaign'+':checkbox').prop('checked')==false) {               
      this.permission.sms_campaign = 0;
    }

    if ($('#banned'+':checkbox').prop('checked')) {  
      this.permission.banned = 1;
    }else if ($('#banned'+':checkbox').prop('checked')==false) {               
      this.permission.banned = 0;
    }
  }


  Update_reseller()
  {
    let count_active = 0;

    if(this.get_permissions_sample!=null||undefined)
    {
    this.get_permissions_sample.forEach((element: { active: any; }) => {
      if(element.active)
      {
        count_active++;
      }

    });


    if(count_active>1)
    {
      Toaster_Service.toastNotification_I('Update could only apply for one!');
    }
    else if (count_active<1)
    {
      Toaster_Service.toastNotification_I('Need to select atleast one!')
    }

    else{

      let sub_Acc_id = 0
      let user_name = '';

      this.get_permissions_sample.forEach((element: { active: any; id: number; user_name:any }) => {
        if(element.active)
        {
          sub_Acc_id =  element.id;
          user_name = element.active;
        }
  
      });

      {
          let json = localStorage.getItem("user_data");  
          this.managing_permissions();
          {
          // if(json!=null)
          {
          // this.data = JSON.parse(json);
          // let username = this.data.username;
          // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
          
          var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);

          this.permission.username = user_name;
          this.permission.id = sub_Acc_id;
      
          this.freeapi.inject_Acc_permissions(sub_Acc_id,this.permission)
          .subscribe(
            res=>{
              let data = JSON.parse(JSON.stringify(res));
              // --------------------------------------->>>>
              Toaster_Service.toastNotification_S(data.response_msg);
              this.modalService.dismissAll();

              // console.log(res);
            },
            err=>
            {
              // alert(err);
              console.log(err);
              Toaster_Service.toastNotification_D('Open console to check the error');
      
            }
          )
          }
    
          }
      
        }
    }

    }
    else
    {
      Toaster_Service.toastNotification_I('Must select one!');
    }
  }


  Update_reseller_byOne(subaccount_id: any)
  {
    this.get_permissions_sample.forEach((_element: any) => {
      if(_element.id==subaccount_id)
      {
        _element.active = !_element.active;

      }

    });
    console.log(this.get_permissions_sample);
  }
  Update_resell_checkedAll()
  {
    this.get_permissions_sample.forEach((_element: any) => {
        _element.active = !_element.active;
    });
  }



}
