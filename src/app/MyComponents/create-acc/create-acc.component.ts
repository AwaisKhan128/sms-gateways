import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
    // Import the functions you need from the SDKs you need
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { Countries } from 'src/app/Classes/getCountries';
import { Country_Data } from 'src/app/Classes/getCountry_Data';

import { data } from 'jquery';



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



   // TODO: Replace the following with your app's Firebase project configuration
 firebaseConfig = {
  apiKey: "AIzaSyApwLqNxrxhOyN7DvuoH-W5SM_f1xzNWyk",
  authDomain: "sms-gateway-2911d.firebaseapp.com",
  projectId: "sms-gateway-2911d",
  storageBucket: "sms-gateway-2911d.appspot.com",
  messagingSenderId: "220103101311",
  appId: "1:220103101311:web:db46b49d91cb3ad28aa84a",
  measurementId: "G-CV1Z2CRDCZ"
  //...
};

 app = initializeApp(this.firebaseConfig);
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
  

  public CreateIt()
  {


    // ---------Sign up here -------------
  this.SignUp(this.email,this.email1)

    
    $("#fname").val('')
    $("#email").val('')
    $("#email1").val('')


  }




  public SignUp(username:string,password:string):void
  {

    var val = $("#selects1").val();
    alert(val);

    // const auth = getAuth();
    // createUserWithEmailAndPassword(auth, username, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log("Signin_Success",user.email);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("Error Found",errorMessage);
    //     alert(errorMessage);
    //     // ..
    //   });
  }

}
