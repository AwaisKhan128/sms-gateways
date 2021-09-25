import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { getAccResp, getAccResp1, _Currency, _subaccount } from 'src/app/Classes/getAccResps';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import * as $ from 'jquery';
import { getAccDetails,getAccDetails1,getAccCurrency,getsubAcc } from 'src/app/Classes/signin';
import { ActivatedRoute, Router } from '@angular/router';






@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  uname:any;
  passcode:any;
  getAccResp: any;
  getAccDetails:any;
  getAccDetails1:any;
  getAccCurrency:any;
  getsubAcc:any;


  window: any["$"] = $; 


  constructor(private freeapi :API_Services,private ActivatedRoute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  public LogIn()
  {
    this.Login(this.uname,this.passcode);
  }


  public async Login(username:string,password:string)
  {

    // var val = $("#selects1").val();
    // alert(val);'


    var encoded = EncodeDecode.b64EncodeUnicode(username+':'+password);
    this.freeapi.getLogin(encoded)
    .subscribe(
      data=>
      {
        console.log(data);
        this.getAccDetails = data;
        this.getAccDetails1 = data.data;
        this.getAccCurrency = data._currency;
        this.getsubAcc = data._subaccount;
        // this.router.navigate(['profile/dashboard'], { queryParams: { order: this.getAccDetails1.user_id } });

      }
    )
    



    


  }

}
