import { empty } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Country_Data } from 'src/app/Classes/getCountry_Data';
import * as $ from 'jquery';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { packages,Package_currency,Packages_History, Packages_History1 } from 'src/app/Classes/packages';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { ToastNotificationInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';




@Component({
  selector: 'app-web-top',
  templateUrl: './web-top.component.html',
  styleUrls: ['./web-top.component.css']
})
export class WebTopComponent implements OnInit {
  contries_data: Country_Data[]|undefined;
  window: any["$"] = $; 
  packages:packages[]|any;
  Package_currency:Package_currency[]|any;
  country:any;
  type:any;

  Packages_History:Packages_History|any; 
  Packages_History1:Packages_History1[]|any;

  rechargeIt(event:any)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    // console.log(value);
    let json = localStorage.getItem("user_data");
    // if (json != null) 
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
    var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');
    console.log(auths);
    this.freeapi.recharge_package(auths,value)
    .subscribe
    (
      res=>
      {
        let receive = JSON.parse(JSON.stringify(res));
        this.toastNotification_S(receive.error.response_msg);
        // console.log(receive.response_msg);
      },
      err=>
      {
       let receive = JSON.parse(JSON.stringify(err));
      //  console.log(receive.error.response_msg);
       this.toastNotification_E(receive.error.response_msg+" "+"Card isn"+"`t ready yet" );
      }
    )
    
    }

  }

    // Create the method
    toastNotification_E(val:any) {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle('Error!');
      newToastNotification.setMessage(val);
  
      // Choose layout color type
      newToastNotification.setConfig({
        LayoutType: DialogLayoutDisplay.DANGER // SUCCESS | INFO | NONE | DANGER | WARNING
      });
  
      // Simply open the toast
      newToastNotification.openToastNotification$();
    }

    toastNotification_S(val:any) {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle('Success!');
      newToastNotification.setMessage(val);
  
      // Choose layout color type
      newToastNotification.setConfig({
        LayoutType: DialogLayoutDisplay.SUCCESS // SUCCESS | INFO | NONE | DANGER | WARNING
      });
  
      // Simply open the toast
      newToastNotification.openToastNotification$();
    }
    toastNotification_I(val:any) {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle('Information!');
      newToastNotification.setMessage(val);
  
      // Choose layout color type
      newToastNotification.setConfig({
        LayoutType: DialogLayoutDisplay.INFO // SUCCESS | INFO | NONE | DANGER | WARNING
      });
  
      // Simply open the toast
      newToastNotification.openToastNotification$();
    }

  

  get_Packages()
  {   
   let country = $('#select_country').val();
   this.type = $('#select_type').val();
  //  console.log(this.type);

   let json = localStorage.getItem("user_data");
   // if (json != null) 
   {
     // this.data = JSON.parse(json);
     // let username = this.data.username;
     // let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
     var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');
      this.freeapi.get_packages_list(auths,country)
      .subscribe
      (
        res=>
        {
          let receive = JSON.parse(JSON.stringify(res));
          this.packages = receive.data.packages;
          console.log(this.packages);
        },
        err=>
        {
          console.log(err);
        }
      )
   
   }

  }



  constructor(private freeapi :API_Services) { }

  ngOnInit(): void {

    let json = localStorage.getItem("user_data");
    // if (json != null) 
    {
      // this.data = JSON.parse(json);
      // let username = this.data.username;
      // let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com' + ":" + 'Myyahooacc#1');
      this.freeapi.get_recharged_history(auths)
    .subscribe(
      res=>
      {
        let receive = JSON.parse(JSON.stringify(res));
        this.Packages_History = receive.data;
        this.Packages_History1 = receive.data.data;
        if (receive.data.data.length==0)
        {
          this.toastNotification_I('No Transactions available to show!')
        }
        else
        {
          this.toastNotification_S(receive.response_msg)
        }

        // console.log(receive);
      },
      err=>
      {
        let receive = JSON.parse(JSON.stringify(err));
        // this.Packages_History = receive.data;
        // this.Packages_History1 = receive.data.data;

        console.log(receive);
      }
    )
    
    
    }

    


    

    this.freeapi.getCountriess()
    .subscribe(
      data=>{
        this.contries_data = data.data;

      }

    )
  }

}
