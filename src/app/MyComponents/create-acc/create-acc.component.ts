import { Toaster_Service } from 'src/app/Classes/ToasterNg';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';
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

  constructor(private freeapi :API_Services,private snakeBar: Snake_Waiting) { }

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
this.snakeBar.start_bar("Please Wait");
    let json = 
    {
      "first_name" : this.fname,
      "last_name" : this.lname,
      "username" : this.uname,
      "user_email" : this.email,
      "password" : this.email1,
      "account_name" : this.business_name,
      "user_phone" : this.number,
      "country": $("#option_value").val()

    }

    this.freeapi.create_superadmin(json)
    .subscribe
    (
        res =>
        {
          Toaster_Service.toastNotification_S(res);
          this.snakeBar.close_bar()
          console.log("Registration Completed! "+res);

        },
        err=>
        {
          Toaster_Service.toastNotification_D(err);
          this.snakeBar.close_bar()
          console.log(err);
        }
      
    )



    // $("#fname").val('')
    // $("#email").val('')
    // $("#email1").val('')

  }





}
