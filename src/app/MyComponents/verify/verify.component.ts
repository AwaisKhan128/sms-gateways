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
  data: any;
  update_data: any;

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
      // console.log(this.code);
      let new_code = this.code;
      let data  = (localStorage.getItem("temp_code"));

      if (new_code == data)
      {
        this.snakeBar.start_bar('Please Wait');
        localStorage.removeItem("temp_code");
        localStorage.setItem("user_status", "Logged_in");
        // let update_data:any|null = JSON.parse(JSON.stringify(localStorage.getItem("user_data"))) ;

        let json = localStorage.getItem("user_data");

    
        // let username = this.data.username;
        
        if (json!=null)
        {
          this.update_data = JSON.parse(json);
          let id = this.update_data.id;
          let ip_addr = this.update_data.ip_addr;
          let device = this.update_data.device;
          let country = this.update_data.country;
          let type = this.update_data.type;
          console.log(type)
          // console.log(type+" "+country)



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

        }
        // this.router.navigate(['./profile'])


      }
      else{
        console.log("Not matched "+data)
      }

  

    }
  }

  public SendOTP():void
  {
    
  }

}
