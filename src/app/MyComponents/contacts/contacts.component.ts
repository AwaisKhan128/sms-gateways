import { get_contact_list, get_contact_list1, get_contact_list2, get_contact_list_template, 
  get_contacts1, get_contacts2, get_contacts3_data, Create_Contact, Update_Contact, Update_Contact_sample } from './../../Classes/manage_contacts';
import { Component, OnInit } from '@angular/core';
import { ToastNotificationInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { Create_Contact_List } from 'src/app/Classes/manage_contacts';
import { Toaster_Service } from 'src/app/Classes/ToasterNg';
import * as $ from 'jquery';
import { isChecked, myCredentials } from 'src/app/APIS/APIConfig';
import { identity, empty } from 'rxjs';
import { inject } from '@angular/core/testing';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';



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
  ischeck :isChecked|boolean|any;

  contact_id:any|boolean;


  // Update Contact & Details
  Update_Contact_sample: Update_Contact_sample[]|any = [];

  



  // Receiving Contacts
  get_contacts1:get_contacts1|any;
  get_contacts2:get_contacts2|any;
  get_contacts3_data:get_contacts3_data[]|any;



  // Create Contacts
  Create_Contact_List:Create_Contact_List|any;

  // Receiving Contacts Lists
  get_contact_list:get_contact_list|any;
  get_contact_list1:get_contact_list1|any;
  get_contact_list2:get_contact_list2[]|any;
  get_contact_list2_top:get_contact_list2[]|any;

  get_contact_list_templates : get_contact_list_template[]|any;

  selected_contact_list :any;


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

      var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);

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
    let min = false;

    this.get_contact_list_templates?.forEach((_element: any) => {
      // _element.active = false;
      // console.log(_element.active);
      if(_element.active===true)
      {
        min = true;
        let id = _element.list_id;
        let json = localStorage.getItem("user_data");
        let list_name_u = this.List_name_u;


        // if(json!=null)
        {
        // this.data = JSON.parse(json);
        // let username = this.data.username;
        // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

        var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
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
      else
      {

      }

    });
    if(!min)
    {
      Toaster_Service.toastNotification_I('Please select atleast one!')
    }

    this.modalService.dismissAll();




  }


  store_contact_list(packet:any, val:any)
  {
    // this.selected_contact_list = packet;
    // console.log(this.selected_contact_list,val);
    const index = this.get_contact_list_templates.indexOf(packet);
    this.get_contact_list_templates[index].active = !this.get_contact_list_templates[index].active;
    console.log(this.get_contact_list_templates,index);




    //New works
  }

  Checked_All() {

    if ($('.contacts_list'+':checkbox').prop('checked')) {
      //blah blah
      $('.contacts_list'+':checkbox').prop('checked', true);
      this.get_contact_list_templates.forEach((_element: any) => {
        _element.active = true;

      });
      console.log(this.get_contact_list_templates);

    }
    else {

      $('.contacts_list'+':checkbox').prop('checked', false);

      this.get_contact_list_templates.forEach((_element: any) => {
        _element.active = false;

      });
      console.log(this.get_contact_list_templates);
    }

  }



  C_Contact(content: any) {


    {

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log($(result));
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

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


  constructor(private modalService: NgbModal
    , private freeAPI: API_Services, public create_Contact: Create_Contact
    ,public Update_Contact: Update_Contact,private Snake_Wait:Snake_Waiting) { }

  ngOnInit(): void {
    this.Snake_Wait.start_bar("Please Wait");
let json = localStorage.getItem("user_data");

    // if(json!=null)
{
// this.data = JSON.parse(json);
// let username = this.data.username;
// let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
// var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);


this.freeAPI.get_contact_list(auths)
.subscribe(
  res=>{
    let data = JSON.parse(JSON.stringify(res));
    this.get_contact_list = data;
    this.get_contact_list1 = data.data;
    this.get_contact_list2 = data.data.data;
    this.get_contact_list2_top = data.data.data;

    
    this.get_contact_list_templates = data.data.data;    
    this.get_contact_list_templates?.forEach((_element: any) => {
      _element.active = false;

    });


    // this.modalService.dismissAll();
    Toaster_Service.toastNotification_S(data.response_msg);
    this.Snake_Wait.close_bar();


    // console.log(res);
  },
  err=>
  {
    // alert(err);
    console.log(err.response_msg);
    Toaster_Service.toastNotification_D(err.response_msg);
    this.Snake_Wait.close_bar();


  }
)
}
  }



  delete_list()
  {
    let min = false;
    this.Snake_Wait.start_bar("Please Wait!");

    this.get_contact_list_templates?.forEach((_element: any) => {
      // _element.active = false;
      // console.log(_element.active);
      if(_element.active===true)
      {
        min = true;
        let id = _element.list_id;
        let json = localStorage.getItem("user_data");

        // if(json!=null)
        {
        // this.data = JSON.parse(json);
        // let username = this.data.username;
        // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

        var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);


        this.freeAPI.delete_contact_list(auths,id)
        .subscribe(
          res=>{
            let data = JSON.parse(JSON.stringify(res));
            // this.modalService.dismissAll();
            Toaster_Service.toastNotification_S(data.response_msg);
            this.Snake_Wait.close_bar();

            // console.log(res);
          },
          err=>
          {
            // alert(err);
            console.log(err.response_msg);
            Toaster_Service.toastNotification_D(err.response_msg);
            this.Snake_Wait.close_bar();

          }
        )
        }

      }
      else
      {
        this.Snake_Wait.close_bar();
      }

    });
    if(!min)
    {
      Toaster_Service.toastNotification_I('Please select atleast one!')
      
    }

    this.modalService.dismissAll();

  }


  // For contacts

  onSelected_list(event:any,evt:any) // As list changes to new
  {
    // console.log(event,evt.target);
    console.log($('.selected_lists').val());
    this.Snake_Wait.start_bar("Please Wait!");
    let json = localStorage.getItem("user_data");

    // if(json!=null)
    {
    // this.data = JSON.parse(json);
    // let username = this.data.username;
    // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
    // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
    let id = $('.selected_lists').val();

    var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);

    this.Update_Contact_sample = [];
    this.freeAPI.get_Contacts(auths,id)
    .subscribe(
      res=>{
        let data = JSON.parse(JSON.stringify(res));
        this.get_contacts1 = data;
        this.get_contacts2 = data.data;
        this.get_contacts3_data = data.data.data;


        this.get_contacts3_data.forEach(element => {

          let json:any = [];
          json.contact_id = element.contact_id;
          json.active = false;

          this.Update_Contact_sample.push(json);
          // this.Update_Contact_sample.active = false;
          // console.log(element.contact_id);

        });
        console.log(this.Update_Contact_sample);

        // this.Update_Contact_sample.array.forEach(element => {
        //   element.active = false;
        // });

        // this.modalService.dismissAll();
        Toaster_Service.toastNotification_S(data.response_msg);
        this.Snake_Wait.close_bar();
        // console.log(res);
      },
      err=>
      {
        // alert(err);
        console.log(err.response_msg);
        Toaster_Service.toastNotification_D(err);
        this.Snake_Wait.close_bar();

      }
    )
    }

    
  }

  Create_Contact()
  {
    // console.log(this.create_Contact.c_first_name);
    let id = $('.selected_lists').val();
    // console.log();

    this.Snake_Wait.start_bar("Please Wait");
    
    if ( (this.create_Contact.phone_number==null||undefined||'' ) || 
    (this.create_Contact.custom_1==null||undefined||'' ) )
    {
      Toaster_Service.toastNotification_D('custom1 && phone number are required!');
    }

    else
    {
      let json = localStorage.getItem("user_data");

      if (typeof(id)=='number')

      {
      // if(json!=null)
      {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
      let id = $('.selected_lists').val();
  
      var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
  
      this.freeAPI.create_contact(auths,this.create_Contact,id)
      .subscribe(
        res=>{
          let data = JSON.parse(JSON.stringify(res));
          this.get_contacts1 = data;
          this.get_contacts2 = data.data;
          this.get_contacts3_data = data.data.data;
  
  
          // this.modalService.dismissAll();
          Toaster_Service.toastNotification_S(data.response_msg);
          this.Snake_Wait.close_bar();
          // console.log(res);
        },
        err=>
        {
          // alert(err);
          console.log(err);
          Toaster_Service.toastNotification_D('Open console to check the error');
          this.Snake_Wait.close_bar();
  
        }
      )
      }

      }
      else{
        Toaster_Service.toastNotification_I('Please select one list!')
        this.Snake_Wait.close_bar();
      }

    }
    
  }


 public Update_Contacts()
  {
    let count_active = 0;
    this.Snake_Wait.start_bar('Please Wait');

    if(this.Update_Contact_sample!=null||undefined)
    {
    this.Update_Contact_sample.forEach(element => {
      if(element.active)
      {
        count_active++;
      }

    });


    if(count_active>1)
    {
      Toaster_Service.toastNotification_I('Update could only apply for one!');
      this.Snake_Wait.close_bar();
    }
    else if (count_active<1)
    {
      Toaster_Service.toastNotification_I('Need to select atleast one!')
      this.Snake_Wait.close_bar();
    }

    else{

        // console.log(this.create_Contact.c_first_name);
        let list_id = $('.selected_lists').val();
        // console.log();
        let contact_id = 0;
          this.Update_Contact_sample.forEach(element => {
            if(element.active)
            {
              contact_id = element.contact_id;
            }
            
          });
        
        if ( (this.Update_Contact.phone_number==null||undefined||'' ) || 
        (this.Update_Contact.custom_1==null||undefined||'' ) )
        {
          Toaster_Service.toastNotification_D('custom1 && phone number are required!');
          this.Snake_Wait.close_bar();
        }
    
        else
        {
          let json = localStorage.getItem("user_data");  
          
    
         
    
          {
          // if(json!=null)
          {
          // this.data = JSON.parse(json);
          // let username = this.data.username;
          // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
          // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
          
    
  
          var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
      
          this.freeAPI.update_contact(auths,this.Update_Contact,list_id,contact_id)
          .subscribe(
            res=>{
              let data = JSON.parse(JSON.stringify(res));
              // this.get_contacts1 = data;
              // this.get_contacts2 = data.data;
              // this.get_contacts3_data = data.data.data;
      
      
              // this.modalService.dismissAll();
              Toaster_Service.toastNotification_S(data.response_msg);
              this.Snake_Wait.close_bar();
              // console.log(res);
            },
            err=>
            {
              // alert(err);
              console.log(err);
              Toaster_Service.toastNotification_D('Open console to check the error');
              this.Snake_Wait.close_bar();
      
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
      this.Snake_Wait.close_bar();
    }


  }


  Update_contact_byOne(val:any)
  {
    this.Snake_Wait.start_bar("Please Wait!")

    this.Update_Contact_sample.forEach(element => {
      if (element.contact_id==val)
      {
        element.active = !element.active;
      }
      
    });
    this.Snake_Wait.close_bar();
  }

  Update_contact_checkedAll()
  {console.log(this.Update_Contact_sample);
    if ($('.contact_select'+':checkbox').prop('checked')) {
      //blah blah
      $('.contact_select'+':checkbox').prop('checked', true);
      this.Update_Contact_sample.forEach((_element: any) => {
        _element.active = true;

      });
      // console.log(this.Update_Contact_sample);

    }
    else {

      $('.contact_select'+':checkbox').prop('checked', false);

      this.Update_Contact_sample.forEach((_element: any) => {
        _element.active = false;

      });
      // console.log(this.Update_Contact_sample);
    }
  }


  d_Contact()
  {
    let count_active = 0;
    this.Snake_Wait.start_bar('Please Wait!');

    if(this.Update_Contact_sample!=null||undefined)
    {
    this.Update_Contact_sample.forEach(element => {
      if(element.active)
      {
        count_active++;
      }

    });


    if(count_active>1)
    {
      Toaster_Service.toastNotification_I('Delete could only apply for one!');
      this.Snake_Wait.close_bar();
    }
    else if (count_active<1)
    {
      Toaster_Service.toastNotification_I('Need to select atleast one!')
      this.Snake_Wait.close_bar();
    }

    else{

        // console.log(this.create_Contact.c_first_name);
        let list_id = $('.selected_lists').val();
        // console.log();
        let contact_id = 0;
          this.Update_Contact_sample.forEach(element => {
            if(element.active)
            {
              contact_id = element.contact_id;
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
          
    
  
          var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
      
          this.freeAPI.delete_contact(auths,list_id,contact_id)
          .subscribe(
            res=>{
              let data = JSON.parse(JSON.stringify(res));
              // this.get_contacts1 = data;
              // this.get_contacts2 = data.data;
              // this.get_contacts3_data = data.data.data;
      
      
              // this.modalService.dismissAll();
              Toaster_Service.toastNotification_S(data.response_msg);
              this.Snake_Wait.close_bar();
              // console.log(res);
            },
            err=>
            {
              // alert(err);
              console.log(err);
              Toaster_Service.toastNotification_D('Open console to check the error');
              this.Snake_Wait.close_bar();

      
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
      this.Snake_Wait.close_bar();
    }
    
  }


  get_current_list()
  {

    let list_id = $('#list_selected').val();
    let json = localStorage.getItem("user_data");
    this.get_contact_list2 = [];
    this.get_contact_list_templates = [];
    this.Snake_Wait.start_bar('Please Wait');

    

    if ((list_id)!='Default')
    {

      
    // if(json!=null)
      {
        // this.data = JSON.parse(json);
        // let username = this.data.username;
        // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
        // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
        
        var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
        
        this.freeAPI.get_spec_contact_list(auths,list_id)
        .subscribe(
          res=>{
            let data = JSON.parse(JSON.stringify(res));
            this.get_contact_list = data;
            this.get_contact_list1 = data.data;
            this.get_contact_list2.push(data.data);
            
            this.get_contact_list_templates.push(data.data);    
            this.get_contact_list_templates?.forEach((_element: any) => {
              _element.active = false;
        
            });
        
        
            // this.modalService.dismissAll();
            Toaster_Service.toastNotification_S(data.response_msg);
            this.Snake_Wait.close_bar();
        
          },
          err=>
          {
            // alert(err);
            console.log(err.response_msg);
            Toaster_Service.toastNotification_D(err.response_msg);
            this.Snake_Wait.close_bar();
        
          }
        )
        }


    }

    else
    {
      
    // if(json!=null)
  {
  // this.data = JSON.parse(json);
  // let username = this.data.username;
  // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
  // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
  
  var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);
  
  
  this.freeAPI.get_contact_list(auths)
  .subscribe(
    res=>{
      let data = JSON.parse(JSON.stringify(res));
      this.get_contact_list = data;
      this.get_contact_list1 = data.data;
      this.get_contact_list2 = data.data.data;
  
      
      this.get_contact_list_templates = data.data.data;    
      this.get_contact_list_templates?.forEach((_element: any) => {
        _element.active = false;
  
      });
  
  
      // this.modalService.dismissAll();
      Toaster_Service.toastNotification_S(data.response_msg);
      this.Snake_Wait.close_bar();
  
      // console.log(res);
    },
    err=>
    {
      // alert(err);
      console.log(err.response_msg);
      Toaster_Service.toastNotification_D(err.response_msg);
      this.Snake_Wait.close_bar();
  
    }
  )
  }

    }


  }


  type_list()
  {
    console.log($('#list_typeOptions').val())
  }

  ContactByPageno(event:any)
  {
    console.log(event);
    // this.Snake_Wait.start_bar('Please Wait!');

    let json = localStorage.getItem("user_data");

    // if(json!=null)
    {
    // this.data = JSON.parse(json);
    // let username = this.data.username;
    // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
    // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

    var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);


    this.freeAPI.get_contact_list_byNum(auths,event.pageIndex,event.pageSize)
    .subscribe(
      res=>{
        let data = JSON.parse(JSON.stringify(res));
        this.get_contact_list = data;
        this.get_contact_list1 = data.data;
        this.get_contact_list2 = data.data.data;
        this.get_contact_list2_top = data.data.data;

        
        this.get_contact_list_templates = data.data.data;    
        this.get_contact_list_templates?.forEach((_element: any) => {
          _element.active = false;

        });


        // this.modalService.dismissAll();
        // Toaster_Service.toastNotification_S(data.response_msg);

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


ContactsByPageno(event:any)
{
  
  let json = localStorage.getItem("user_data");

  // if(json!=null)
  {
  // this.data = JSON.parse(json);
  // let username = this.data.username;
  // let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
  // var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);
  let id = $('.selected_lists').val();

  var auths = EncodeDecode.b64EncodeUnicode(myCredentials.username + ":" + myCredentials.password);

  this.Update_Contact_sample = [];
  this.freeAPI.get_Contacts_by_Num(auths,id,event.pageIndex,event.pageSize)
  .subscribe(
    res=>{
      let data = JSON.parse(JSON.stringify(res));
      this.get_contacts1 = data;
      this.get_contacts2 = data.data;
      this.get_contacts3_data = data.data.data;


      this.get_contacts3_data.forEach(element => {

        let json:any = [];
        json.contact_id = element.contact_id;
        json.active = false;

        this.Update_Contact_sample.push(json);
        // this.Update_Contact_sample.active = false;
        // console.log(element.contact_id);

      });
      // console.log(this.Update_Contact_sample);

      // this.Update_Contact_sample.array.forEach(element => {
      //   element.active = false;
      // });

      // this.modalService.dismissAll();
      // Toaster_Service.toastNotification_S(data.response_msg);
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


}
}
