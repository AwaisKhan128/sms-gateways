import { send_Code } from './../../Classes/Verify_acc';
import { Component, OnInit } from '@angular/core';

    // Import the functions you need from the SDKs you need
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { Countries } from 'src/app/Classes/getCountries';
import { Country_Data } from 'src/app/Classes/getCountry_Data';


import { data } from 'jquery';
import { CreateAcc } from 'src/app/Classes/createAcc_';
import { getAccResp, getAccResp1, _Currency, _subaccount } from 'src/app/Classes/getAccResps';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';



@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css']
})
export class CreateAccComponent implements OnInit {

   email : string|any;
   email1 : string|any;
   name : string|any;
   uname:string|any;
   fname:string|any;
   lname:string|any;
   number:number|any;
   business_name:any;
   contries: Countries[]|undefined;
   contries_data: Country_Data[]|undefined;
   getAccResp:any;
   getAccResp1:any;
   _Currency:any;
   _subaccount:any;


   


  // --------------->


 window: any["$"] = $; 
  //  ------------

  constructor(private freeapi :API_Services) { }

  ngOnInit(): void {
    this.freeapi.getCountriess()
    .subscribe(
      data=>{

        this.contries = data;
        this.contries_data = data.data;
      }

    )

  }
  

  public async CreateIt()
  {


    // ---------Sign up here -------------
  await this.SignUp(this.uname,this.number,this.fname
    ,this.lname,this.business_name, this.email,this.email1);

    // $("#fname").val('')
    // $("#email").val('')
    // $("#email1").val('')
  }




  public async SignUp(username:string,user_phone:number,first_name:string
    ,last_name:string,acc_name:string,email:string,password:string)
  {

    // var val = $("#selects1").val();
    // alert(val);
    
    var lstPost = new CreateAcc();
    lstPost.username = username;
    lstPost.user_email = email;
    lstPost.user_phone = user_phone;
    lstPost.user_first_name = first_name;
    lstPost.user_last_name = last_name;
    lstPost.country = $("#selects1").val();
    lstPost.password = password;
    lstPost.account_name = acc_name;


    this.freeapi.createAcc_post('application/json', lstPost)
      .subscribe(
        
        data => 
            {
              this.getAccResp = data;
              alert(this.getAccResp.response_code + " " + this.getAccResp.response_msg);

              var send = new send_Code();
              send.country = $("#selects1").val();
              send.type = "sms";
              send.user_phone = user_phone;

              var encoded = EncodeDecode.b64EncodeUnicode(username+':'+password);

              this.freeapi.send_Code(encoded,send)
              .subscribe(
                data=>
                {
                  alert(data.response_msg);
                }
              )


            }
      )


  }

}
