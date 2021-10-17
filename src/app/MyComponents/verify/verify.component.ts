import { EncodeDecode } from './../../Classes/EncodeDec64';
import { empty } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { SharedService } from 'src/app/Classes/shared_services';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';
import { Toaster_Service } from './../../Classes/ToasterNg';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  code:any;
  number:any;

  constructor(private freeapi: API_Services, 
    private router: Router, private shared_services: SharedService,
     private snakeBar:Snake_Waiting) { }

  ngOnInit(): void {
  }

  public Verify():void
  {

    if ( (this.code) == undefined|| null)
    {
      Toaster_Service.toastNotification_I("Code must be enter")
    }
    else
    {
      console.log(this.code);
      let new_code = this.code;
      let data  = JSON.parse(JSON.stringify( localStorage.getItem("temp_code")));

      if (new_code == data)
      {
        this.snakeBar.start_bar('Please Wait');
        localStorage.removeItem("temp_code");
        localStorage.setItem("user_status", "Logged_in");
        let update_data = JSON.parse(JSON.stringify(localStorage.getItem("user_data"))) ;
        
        if (update_data!=null)
        {
          let id = update_data.id;
          let ip_addr = update_data.ip_addr;
          let device = update_data.device;
          let country = update_data.country;
          let type = update_data.type;
          this.freeapi.modifyUserDetailsDB(id
            , ip_addr,device,country, type).subscribe
            (
              res => {
                // console.log(res);
                this.snakeBar.close_bar();
                let val:any;
                val = res;
                console.log(val.http_response);
                Toaster_Service.toastNotification_S(val.http_response);
                this.router.navigate(['./profile'])
  
              },
  
              err => {
                this.snakeBar.close_bar();
                console.log(err);
                Toaster_Service.toastNotification_D("Error check console ->");
                }
  
            )
          this.router.navigate(['./profile']);

        }

      }

      // let data  = JSON.parse(JSON.stringify( localStorage.getItem("user_data")));
      // if (data != null)
      // {
      //   let user_name = data.username;
      //   let passcode = EncodeDecode.b64DecodeUnicode( data.passcode);
      //   var auth = EncodeDecode.b64EncodeUnicode(user_name+':'+passcode);
      //   this.freeapi.getVerify(auth,this.code)
      //   .subscribe
      //   (
      //     res=>
      //     {
      //       localStorage.setItem("user_status", "Logged_in");
      //       this.router.navigate(['./profile'])

      //     },
      //     err=>
      //     {
      //       Toaster_Service.toastNotification_D("Failed to Verify");
      //       console.log(err);
      //     }
      //   )

      // }
      // else{
      //   console.log("Data is null");
      // }
      

    }
  }

  public SendOTP():void
  {
    
  }

}
