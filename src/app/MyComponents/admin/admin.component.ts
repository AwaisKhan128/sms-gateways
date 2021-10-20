import { get_SubAcc_details, get_SubAcc_details1, get_SubAcc_details2, Update_Admin_Result, Update_Admin_Sample } 
from './../../Classes/createAcc_';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { Countries } from 'src/app/Classes/getCountries';
import { Country_Data } from 'src/app/Classes/getCountry_Data';
import * as $ from 'jquery';
import { CreateAcc } from 'src/app/Classes/createAcc_';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { send_Code } from 'src/app/Classes/Verify_acc';
import { Toaster_Service } from 'src/app/Classes/ToasterNg';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Permission } from 'src/app/Classes/Permissions';
// this is just a comment


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  countries:Countries[]|any;
  contries_data: Country_Data[]|undefined;
  passcode:any;
  email:any;
  number:any;
  lname:any;
  fname:any;
  business_name:any;
  uname:any;
  getAccResp:any;
  getAccResp1:any;
  _Currency:any;
  _subaccount:any;
  window: any["$"] = $;
  closeResult: string='';

  get_SubAcc_details:get_SubAcc_details|any;
  get_SubAcc_details1:get_SubAcc_details1|any;
  get_SubAcc_details2:get_SubAcc_details2[]|any;
  get_SubAcc_details2_sample:get_SubAcc_details2[]|any;


  Update_Admin_Result:Update_Admin_Result|any;
  Update_Admin_Sample:Update_Admin_Sample[]|any;
  Update_Admin_Sample_for_Selection:Update_Admin_Sample[]|any;
  data: any;




  constructor(private freeapi:API_Services, public Create_subAcc:CreateAcc
    ,private modalService: NgbModal, public permission:Permission) { }

  ngOnInit(): void {


    let json = localStorage.getItem("user_data");
        if(json!=null)
        {
          this.data = JSON.parse(json);
          let username = this.data.username;
          let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
      
          // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
          
          this.freeapi.get_Sub_Acc(auths)
          .subscribe
          (
            data=>
            {
              let data_resp = JSON.parse(JSON.stringify(data));
              this.get_SubAcc_details = data_resp;
              this.get_SubAcc_details1 = data_resp.data;
              this.get_SubAcc_details2 = data_resp.data.data;
              
              this.Update_Admin_Sample = data_resp.data.data;
              this.Update_Admin_Sample_for_Selection = data_resp.data.data;


              this.Update_Admin_Sample.forEach((element: { active: boolean; }) => {
                element.active = false;
              });

              

            },
            res=>
            {
              console.log(res);

            }

          )
      
        }


  }

  async Create_Admin()
  {

    let country_code = $("#select1").val();

    this.SignUp();
    

  }

  public ALL_fine(f_name:any,l_name:any,u_name:any,b_name:any,number:any,email:any,password:any):boolean
  {
    if( (f_name!=null||undefined||'') && (l_name!=null||undefined||'')
     && (u_name!=null||undefined||'') && (b_name!=null||undefined||'')
     && (number!=null||undefined||'') && (email!=null||undefined||'') 
     && (password!=null||undefined||'')  )
     {
       return true;
     }
     else{
       return false;
     }
  }

  public SignUp()
  {

    let json = localStorage.getItem("user_data");
    // let phone = this.Create_subAcc.phone_number;
    // this.Create_subAcc.phone_number = '';
    // this.Create_subAcc.phone_number =  phone;
    // console.log($("#selects1").val())
    // console.log(this.Create_subAcc);

        if(json!=null)
        {
          this.data = JSON.parse(json);
          let username = this.data.username;
          let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
      
          
          // this.Create_subAcc.phone_number = $("#select1").val() + this.Create_subAcc.phone_number;
      
      
          this.freeapi.createAcc_post(auths,this.Create_subAcc)
            .subscribe(
              
              data => 
                  {
                    let data_resp = JSON.parse( JSON.stringify (data) );
                    this.permission.id = data_resp.data.subaccount_id
                    this.permission.username = data_resp.data.api_username
                    this.managing_permissions();

                    this.freeapi.setUserDetailsDB(this.permission.id,this.permission.username,"","","","subadmins")

                    this.freeapi.send_email_credential_admin(data_resp.data.email
                      ,data_resp.data.api_username,data_resp.data.api_key)
                    .subscribe
                    (
                      data=>
                      {
                        let resp_data= JSON.parse(JSON.stringify(data));
                        // --------Permissions--------------
                        this.freeapi.push_Acc_permissions("admin",this.permission)
                        .subscribe
                        (
                          res=>
                          {
                            let final_resp = JSON.parse(JSON.stringify(res));
                            console.log(final_resp);
                            Toaster_Service.toastNotification_S("Success"+final_resp.http_response);
                            console.log(this.permission);
                            Toaster_Service.toastNotification_S(data_resp.response_msg);
                            console.log(data);
                            // $('#api_username').val('');
                            // $('#first_name').val('');
                            // $('#last_name').val('');
                            // $('#phone_number').val('');
                            // $('#password').val('');
                            // $('#email').val('');
                          },
                          err=>
                          {
                            let final_resp = JSON.parse(JSON.stringify(err));
                            console.log(final_resp);
                            console.log(this.permission);
                            Toaster_Service.toastNotification_S("Failed to Update Permissions");
                            
                          }
                        )

                      

                        // <--------------------------------->
                        Toaster_Service.toastNotification_S(resp_data.response_msg);
                        console.log(this.permission);

                        this.modalService.dismissAll();
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
                    let err = JSON.parse( JSON.stringify (res) );
                    console.log(res);
                    console.log(this.Create_subAcc);
                    Toaster_Service.toastNotification_D(err.response_msg+"Error Creating subAcc!");
                    // alert(err.response_code + " " + err.response_msg);
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


  Update_admin_checkedAll()
  {
    if ($('.subAcc_select'+':checkbox').prop('checked')) {
      //blah blah
      $('.subAcc_select'+':checkbox').prop('checked', true);
      this.Update_Admin_Sample.forEach((_element: any) => {
        _element.active = true;

      });
      console.log(this.Update_Admin_Sample);

    }
    else {

      $('.subAcc_select'+':checkbox').prop('checked', false);

      this.Update_Admin_Sample.forEach((_element: any) => {
        _element.active = false;

      });
      console.log(this.Update_Admin_Sample);
    }
  }


  Update_contact_byOne(subaccount_id:any)
  {
    this.Update_Admin_Sample.forEach((_element: any) => {

      if(_element.subaccount_id==subaccount_id)
      {
        _element.active = !_element.active;

      }

    });
    console.log(this.Update_Admin_Sample);

  }

  Update_Admin()
  {
    
    let count_active = 0;

    if(this.Update_Admin_Sample!=null||undefined)
    {
    this.Update_Admin_Sample.forEach((element: { active: any; }) => {
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

      this.Update_Admin_Sample.forEach((element: { active: any; subaccount_id: number; }) => {
        if(element.active)
        {
          sub_Acc_id =  element.subaccount_id;
        }
  
      });

      {
          let json = localStorage.getItem("user_data");  
          
  
          {
          if(json!=null)
          {
          this.data = JSON.parse(json);
          let username = this.data.username;
          let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

          this.freeapi.update_Sub_Acc(auths,this.Create_subAcc,sub_Acc_id)
          .subscribe(
            res=>{
              let data = JSON.parse(JSON.stringify(res));
              // --------------------------------------->>>>
              this.permission.id = data.data.subaccount_id
              this.permission.username = data.data.api_username
              this.managing_permissions();

              // ------------------>
              // --------Permissions--------------
              this.freeapi.inject_Acc_permissions(data.data.subaccount_id,this.permission)
              .subscribe
              (
                res=>
                {
                  let final_resp = JSON.parse(JSON.stringify(res));
                  console.log(final_resp);
                  Toaster_Service.toastNotification_S("Success"+final_resp.http_response);
                },
                err=>
                {
                  let final_resp = JSON.parse(JSON.stringify(err));
                  console.log(final_resp);
                  console.log(this.permission);
                  Toaster_Service.toastNotification_S("Failed to Update Permissions");

                }
              )

      
              // this.modalService.dismissAll();
              Toaster_Service.toastNotification_S(data.response_msg);
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


  Resend_Email()
  {
        
    let count_active = 0;

    if(this.Update_Admin_Sample!=null||undefined)
    {
    this.Update_Admin_Sample.forEach((element: { active: any; }) => {
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


      this.Update_Admin_Sample.forEach((element: { active: any; email: string; api_username: string; api_key: string; }) => {
        if(element.active)
        {
          email =  element.email;
          user = element.api_username;
          api = element.api_key;
        }
  
      });

      {
          let json = localStorage.getItem("user_data");  

          {
          if(json!=null)
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


  onSelected_admin(event:any)
  {
    // console.log($('.selected_admin').val());

    let json = localStorage.getItem("user_data");

    if(json!=null)
    {
    this.data = JSON.parse(json);
    let username = this.data.username;
    let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
    var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
    let id = $('.selected_admin').val();

    if (id !='Default')
    {
      
          this.get_SubAcc_details2 = [];
          this.Update_Admin_Sample = [];
      
          // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
      
          this.freeapi.get_Sub_Acc_byID(auths,id)
          .subscribe(
            res=>{
              let data_resp = JSON.parse(JSON.stringify(res));
      
      
              this.get_SubAcc_details = data_resp;
              // this.get_SubAcc_details1 = data_resp.data;
              this.get_SubAcc_details2.push( data_resp.data);
              this.Update_Admin_Sample.push(data_resp.data) ;
              this.Update_Admin_Sample.forEach((element: { active: boolean; }) => {
                element.active = false;
              });
      
      
              console.log(this.Update_Admin_Sample);
      
              // this.Update_Contact_sample.array.forEach(element => {
              //   element.active = false;
              // });
      
              // this.modalService.dismissAll();
              Toaster_Service.toastNotification_S(data_resp.response_msg);
              // console.log(res);
            },
            err=>
            {
              // alert(err);
              console.log(err.response_msg);
              Toaster_Service.toastNotification_D(err);
      
            }
          )
          

    }
    else{
              if(json!=null)
              {
                this.data = JSON.parse(json);
                let username = this.data.username;
                let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
                var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
            
                // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
                
                this.freeapi.get_Sub_Acc(auths)
                .subscribe
                (
                  data=>
                  {
                    let data_resp = JSON.parse(JSON.stringify(data));
                    this.get_SubAcc_details = data_resp;
                    this.get_SubAcc_details1 = data_resp.data;
                    this.get_SubAcc_details2 = data_resp.data.data;
                    
                    this.Update_Admin_Sample = data_resp.data.data;
                    this.Update_Admin_Sample_for_Selection = data_resp.data.data;
      
      
                    this.Update_Admin_Sample.forEach((element: { active: boolean; }) => {
                      element.active = false;
                    });
                    console.log(this.Update_Admin_Sample );
      
                    
                  },
                  res=>
                  {
                    console.log(res);
                  }
      
                )
            
              }

    }
    }

  }


  Delete_Admin()
  {
    let subaccount_id = 0;
    let count = 0;

    this.Update_Admin_Sample.forEach((element: { active: any; subaccount_id: number; }) => {
      if (element.active)
      {
        count++;
      subaccount_id = element.subaccount_id;
      let json = localStorage.getItem("user_data");
      if(json!=null)
      {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
    
        // var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
        
        this.freeapi.delete_subAcc(auths,subaccount_id)
        .subscribe
        (
          data=>
          {
            let data_resp = JSON.parse(JSON.stringify(data));
            Toaster_Service.toastNotification_S(data_resp.response_msg);

            
          },
          res=>
          {
            console.log(res);
            Toaster_Service.toastNotification_D("Failed to delete");

          }

        )
    
      }

      }
      
    });

    if (count===0)
    {
      Toaster_Service.toastNotification_I('Need to Select at least one!');
      count=0;
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


  // Send_Permissions()
  // {
  //   // --------Permissions--------------
  //   this.permission.id = 124
  //   this.permission.username = "resp_data_api_username"
  //   this.managing_permissions();
  //   this.freeapi.push_Acc_permissions("admin",this.permission)
  //   .subscribe
  //   (
  //     res=>
  //     {
  //       let final_resp = JSON.parse(JSON.stringify(res));
  //       console.log(final_resp);
  //       Toaster_Service.toastNotification_S("Success"+final_resp.http_response);
  //     },
  //     err=>
  //     {
  //       let final_resp = JSON.parse(JSON.stringify(err));
  //       console.log(final_resp);
  //       Toaster_Service.toastNotification_D("Failed to Update Permissions");

  //     }
  //   )
  // }
}
