import { SharedService } from './../../Classes/shared_services';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { getAccResp, getAccResp1, _Currency, _subaccount } from 'src/app/Classes/getAccResps';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import * as $ from 'jquery';
import { getAccDetails, getAccDetails1, getAccCurrency, getsubAcc, getSignin_responseDBforSuper } from 'src/app/Classes/signin';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from 'rxjs';
import { forget_password, forget_username, forget_username_resp } from 'src/app/Classes/forgets';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  uname: any;
  passcode: any;
  getAccResp: any;
  getAccDetails:any;
  getAccDetails1:any;
  array:any;




  getAccDetails11: getAccDetails1[] |any;
  getdb_signinresp : getSignin_responseDBforSuper[]|any;

  getAccCurrency:any;
  getsubAcc:any;

  i:any;

  window: any["$"] = $;
  forget_username_resp: forget_username_resp|any;

  constructor(private freeapi :API_Services,private ActivatedRoute:ActivatedRoute
    , private router: Router,private shared_services:SharedService) { }

  ngOnInit(): void {
    this.i=0;

    // console.log(EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com'+":"+'Myyahooacc#1'));
  }

  public LogIn() {
    this.Login(this.uname, this.passcode);
  }


  public async Login(username: string, password: string) {

    // var val = $("#selects1").val();
    // alert(val);'


    var encoded = EncodeDecode.b64EncodeUnicode(username + ':' + password);
    this.freeapi.getLogin(encoded)
      .subscribe(
        (data) => {
          console.log(data);
          this.getAccDetails = data;
          this.getAccDetails1 = data.data;
          this.getAccCurrency = data._currency;
          this.getsubAcc = data._subaccount;
          // this.router.navigate(['profile/dashboard'], { queryParams: { order: this.getAccDetails1.user_id } });


          this.freeapi.getLoginAuthDB(this.getAccDetails1.user_id, 'superadmins')
            .subscribe(
              async (res) => {
                let val = JSON.parse(res.http_response);
                console.log(val[0].id);

                if (val.length == 0) {
                  console.log("ID not found");

                  $.getJSON('http://www.geoplugin.net/json.gp', (data) => {
                    const data_R = data;


                    var content = {
                      "id": this.getAccDetails1.user_id,
                      "username": this.uname,
                      "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                      "ip_addr": data_R.geoplugin_request.substr(0,10),
                      "device":this.getOS(),
                      "country": data_R.geoplugin_countryName
                    }


                    localStorage.setItem("user_data", JSON.stringify(content));
                    localStorage.setItem("user_status", "Logged_in");

                    this.shared_services.setUserData(content);
                    this.freeapi.setUserDetailsDB(this.getAccDetails1.user_id, this.uname
                      , data_R.geoplugin_request.substr(0,10),this.getOS(),data_R.geoplugin_countryName, 'superadmins').subscribe
                      (
                        res => {
                          // console.log(res);
                          let val:any;
                          val = res;
                          alert(val.http_response);
                          this.router.navigate(['./profile'])

                        },

                        err => {
                          console.log(err);
                          alert(err);
                        }

                      )

                  });



                }
                else if (res.length > 0) {
                  // console.log(res[0]);
                  let val = JSON.parse(res.http_response);

                  if (val[0].ip_addr == ''||undefined) {
                    $.getJSON('http://www.geoplugin.net/json.gp', (data) => {
                      let data_R = data;


                      var content = {
                        "id": val[0].id,
                        "username": this.uname,
                        "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                        "ip_addr": data_R.geoplugin_request.substr(0,10),
                        "device":this.getOS(),
                        "country": data_R.geoplugin_countryName

                      }
                      this.shared_services.setUserData(content);
                      localStorage.setItem("user_data", JSON.stringify(content));
                      localStorage.setItem("user_status", "Logged_in");



                      this.freeapi.modifyUserDetailsDB(val[0].id
                        , data_R.geoplugin_request.substr(0,10),this.getOS(),data_R.geoplugin_countryName, 'superadmins')
                        .subscribe(
                          res => {
                            let a :any;
                            a = res;
                            alert(a.http_response);
                            this.router.navigate(['./profile'])
                          },
                          err => {
                            alert(err);
                          }
                        )

                    });

                  }
                  else {

                    $.getJSON('http://www.geoplugin.net/json.gp', (data) => {

                      const data_R = data;
                      if (val[0].username == this.getAccDetails1.username
                        && val[0].ip_addr == data_R.geoplugin_request.substr(0,10) &&
                        val[0].country == data_R.geoplugin_countryName && val[0].device==this.getOS()) {

                        console.log("Confirmation matched")

                        var content = {
                          "id": val[0].id,
                          "username": this.uname,
                          "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                          "ip_addr": val[0].ip_addr,
                          "device":this.getOS(),
                          "country": val[0].country
                        }
                        this.shared_services.setUserData(content);
                        localStorage.setItem("user_data", JSON.stringify(content));
                        localStorage.setItem("user_status", "Logged_in");


                        this.router.navigate(['./profile'])
                        

                        // this.freeapi.setUserDetailsDB(res[0].id,this.uname
                        //   ,res[0].ip_addr,res[0].device,'superadmins').subscribe
                        //   (
                        //     res=>
                        //     {
                        //       console.log(res);
                        //       // alert(res);
                        //       this.router.navigate(['./profile'])

                        //     },

                        //     err=>
                        //     {
                        //       console.log(err);
                        //       alert(err);
                        //     }

                        //   )

                        // console.log(res[0]);
                        // console.log(res.length);

                        // this.getdb_signinresp = (res[0]);
                        // console.log("from_db",this.getdb_signinresp.id);


                        // this.router.navigate(['./profile']);
                      }
                      else {
                        console.log("response not matched");

                      }

                    });
                  }


                }
              },
              (err) => {
                console.log(err);

              }

            )

        },
        (error) => {
          alert(error);
        }
      )


  }



  // public buttons() {
  //   console.log("Checked");

  //   $.getJSON('http://www.geoplugin.net/json.gp', function (data) {
  //     let data_R = data;


  //     console.log(data_R.geoplugin_request.substr(0,10));
  //   });


  // }

  public getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
    
        // this.router.navigate(['profile/dashboard'], { queryParams: { order: this.getAccDetails1.user_id } });
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
  
    return os;
  }


  public forget_chk(id:string )
  {

    // console.log(id);
    {

      switch (id){
        case 'forget_user':
          if (this.i>0 )
          {
            let val =  $('#uname').val();
            if(val!='')
            {
     
             var users = new forget_username();
       
           {
             users.email = val;
             users.phone_number = '';
             this.freeapi.Send_forget_notify(users)
               .subscribe(
                 res => {
                   console.log(res);
                   this.forget_username_resp = res;
                   alert(this.forget_username_resp.response_msg );
                   $('#uname').val('');
                   $('#uname').attr("placeholder","Username");
                   this.i=0;
   
   
                 },
                 err => {
                   alert("Error found");
                   $('#uname').val('');
                   // $('#uname').attr("placeholder","Username");
                   // this.i = 0;
                 }
               )
       
           }
            }
            this.i=0;
          }
          else{
            $('#uname').attr("placeholder","Type your Email!");
            this.i++;
          }
         break;
        
        case 'forget_pass':
          var sd = $('#uname').attr('placeholder')
          if( sd='Username' )
          {
            if($("#uname").val()!='')
            {
              var a = $("#uname").val()
              var forgets = new forget_password();
              forgets.user_name = a;
              // console.log(a);

              this.freeapi.Send_forget_passcode(forgets)
              .subscribe(
                res=>
                {
                  this.forget_username_resp = res;
                  $("#uname").val('');
                  alert(this.forget_username_resp.response_msg);
                },
                err=>
                {
                  alert("Error: "+err);
                }
              )
            }
            else{
              $('#uname').attr('placeholder','Username');
              alert('Type your Username')

            }
          }
          else{
            $('#uname').attr('placeholder','Username');
            alert("Type your Username!")
          }
          break;
      }
    }
  }

    


  
  




}
