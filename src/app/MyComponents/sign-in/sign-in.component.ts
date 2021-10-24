import { Toaster_Service } from './../../Classes/ToasterNg';
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
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';
import { GeolocationService } from '@ng-web-apis/geolocation';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';





@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  uname: any;
  passcode: any;
  getAccResp: any;
  getAccDetails: any;
  getAccDetails1: any;
  array: any;
  i: number | any;
  login_type: any | number = 0
  data: any;


  getAccDetails11: getAccDetails1[] | any;
  getdb_signinresp: getSignin_responseDBforSuper[] | any;

  getAccCurrency: any;
  getsubAcc: any;

  // location_access :any = 'http://www.geoplugin.net/json.gp';


  window: any["$"] = $;
  forget_username_resp: forget_username_resp | any;
  data_security: any;
  onetime: any;


  constructor(private freeapi: API_Services, private ActivatedRoute: ActivatedRoute
    , private router: Router, private shared_services: SharedService, private snakeBar: Snake_Waiting, private readonly geolocation$: GeolocationService) { }

  getChoice() {
    let list_id = $('#list_choice').val();
    this.login_type = list_id;
    // console.log(list_id);

    if (list_id == 0) {
      $('#uname').attr('placeholder', 'Username');
      $("#passcode").attr('placeholder', 'Password');
    }
    else if (list_id == 1) {
      $('#uname').attr('placeholder', 'API_Username');
      $("#passcode").attr('placeholder', 'API_Key');
    }
    else if (list_id == 2) {
      $('#uname').attr('placeholder', 'Username');
      $("#passcode").attr('placeholder', 'Password');
    }

    // console.log(list_id);
  }

  ngOnInit(): void {
    this.i = 0;
    this.onetime = 0

    let json = localStorage.getItem("user_status");
    if (json != null) {
      this.router.navigate(['./profile']);
    }

    this.geolocation$.pipe(take(1)).subscribe(
      position => {
        this.data_security = position;

        // console.log(this.data_security);
      });




    // console.log(EncodeDecode.b64EncodeUnicode('awais.khan128@yahoo.com'+":"+'Myyahooacc#1'));
  }

  public LogIn() {
    this.Login(this.uname, this.passcode);
    // this.test();
  }

  // test()
  // {
  //   let json = ( this.data_security);
  //   console.log(json.coords.latitude)
  // }



  public Login(uname: string, password: string) {

    if (this.login_type == 0) //Super Admin
    {
      this.snakeBar.start_bar("Login in Process!");


      var encoded = EncodeDecode.b64EncodeUnicode(uname + ':' + password);
      this.freeapi.getLogin(encoded)
        .subscribe(
          (data) => {
            // this.snakeBar.close_bar();
            // console.log(data);
            this.getAccDetails = data;
            this.getAccDetails1 = data.data;
            this.getAccCurrency = data._currency;
            this.getsubAcc = data._subaccount;


            this.freeapi.search_permissions(this.getAccDetails1.user_id)
              .subscribe
              (
                res => {
                  this.snakeBar.close_bar()
                  var data_P = JSON.parse((JSON.stringify(res)));
                  console.log(data_P.http_response[0].access_sms);
                  // console.log(data.http_response);
                  // console.log(data.http_response.length);


                  if (data_P.http_response.length > 0 && data_P.http_response[0].username == uname
                    && data_P.http_response[0].status == 'superadmin'
                    && data_P.http_response[0].banned == (0 || '0')) {
                    this.freeapi.search_user('superadmins', this.getAccDetails1.user_id)
                      .subscribe
                      (
                        res => {
                          let val1 = (JSON.parse(JSON.stringify(res)));
                          //console.log(val.http_response);
                          if (val1.http_response.length == 0) {

                            // console.log(val);
                            // this.snakeBar.close_bar();
                            // Toaster_Service.toastNotification_S("Check Console");

                            // Here to Register him...




                            // console.log(latitude+" "+longitude);
                            let latitude = this.data_security.coords.latitude;
                            let longitude = this.data_security.coords.longitude;
                            console.log("Permission", data.http_response[0]);
                            var content = {
                              "id": this.getAccDetails1.user_id,
                              "username": this.uname,
                              "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                              "ip_addr": latitude,
                              "device": this.getOS(),
                              "country": longitude,
                              "type": "superadmins",

                              "permissions":
                              {
                                "sms": data_P.http_response[0].access_sms,
                                "mms": data_P.http_response[0].access_mms,
                                "contacts": data_P.http_response[0].access_contacts,
                                "sms_campaigns": data_P.http_response[0].sms_campaign,
                                "templates": data_P.http_response[0].access_templates,
                                "billings": data_P.http_response[0].access_billing,
                                "top_ups": data_P.http_response[0].mobile_topup,
                                "resellers": data_P.http_response[0].access_resellers,
                                "banned": data_P.http_response[0].banned,
                              }
                            }
                            localStorage.setItem("user_data", JSON.stringify(content));
                            localStorage.setItem("user_status", "Logged_in");

                            this.shared_services.setUserData(content);
                            this.freeapi.setUserDetailsDB(this.getAccDetails1.user_id, this.uname
                              , latitude, this.getOS(), longitude, 'superadmins').subscribe
                              (
                                res => {
                                  // console.log(res);
                                  this.snakeBar.close_bar();
                                  let val: any;
                                  val = res;
                                  console.log(val.http_response);
                                  Toaster_Service.toastNotification_S(val.http_response);
                                  this.router.navigate(['./profile'])

                                },

                                err => {
                                  console.log(err);
                                  this.snakeBar.close_bar();
                                  Toaster_Service.toastNotification_D("Error check console ->");
                                }

                              )


                          }

                          else if (val1.http_response.length > 0) {
                            let data = val1.http_response[0];
                            var content_comp: any;
                            {



                              // console.log("Permission",data);
                              let latitude = this.data_security.coords.latitude;
                              let longitude = this.data_security.coords.longtitude;

                              content_comp = {
                                "id": this.getAccDetails1.user_id,
                                "username": this.uname,
                                "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                                "ip_addr": latitude,
                                "device": this.getOS(),
                                "country": longitude,
                                "type": "superadmins",
                                "permissions":
                                {
                                  "sms": data_P.http_response[0].access_sms,
                                  "mms": data_P.http_response[0].access_mms,
                                  "contacts": data_P.http_response[0].access_contacts,
                                  "sms_campaigns": data_P.http_response[0].sms_campaign,
                                  "templates": data_P.http_response[0].access_templates,
                                  "billings": data_P.http_response[0].access_billing,
                                  "top_ups": data_P.http_response[0].mobile_topup,
                                  "resellers": data_P.http_response[0].access_resellers,
                                  "banned": data_P.http_response[0].banned,
                                }

                              }
                              localStorage.setItem("user_data", JSON.stringify(content_comp));

                              if (data.id == this.getAccDetails1.user_id
                                && data.username == this.uname && data.ip_addr ==
                                latitude && data.device == this.getOS()) {
                                this.snakeBar.close_bar()
                                localStorage.setItem("user_status", "Logged_in");
                                // Navigate to profile
                                Toaster_Service.toastNotification_S("Successfully Signed!");
                                this.router.navigate(['./profile'])
                              }

                              else {
                                // this navigate to OTP.
                                console.log("Not Matched");
                                let latitude = this.data_security.coords.latitude;
                                let longitude = this.data_security.coords.longitude;

                                var val = Math.floor(1000 + Math.random() * (9000 + 54));

                                this.freeapi.sendVerificationcodebyemail(this.getAccDetails1.account_billing_email, val)
                                  .subscribe
                                  (
                                    res => {
                                      this.snakeBar.close_bar();

                                      content_comp = {
                                        "id": this.getAccDetails1.user_id,
                                        "username": this.uname,
                                        "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                                        "ip_addr": latitude,
                                        "device": this.getOS(),
                                        "country": longitude,
                                        "type": "superadmins",
                                        "permissions":
                                        {
                                          "sms": data_P.http_response[0].access_sms,
                                          "mms": data_P.http_response[0].access_mms,
                                          "contacts": data_P.http_response[0].access_contacts,
                                          "sms_campaigns": data_P.http_response[0].sms_campaign,
                                          "templates": data_P.http_response[0].access_templates,
                                          "billings": data_P.http_response[0].access_billing,
                                          "top_ups": data_P.http_response[0].mobile_topup,
                                          "resellers": data_P.http_response[0].access_resellers,
                                          "banned": data_P.http_response[0].banned,
                                        }
                                      }
                                      localStorage.setItem("user_data", JSON.stringify(content_comp));
                                      localStorage.setItem("temp_code", '' + val)
                                      Toaster_Service.toastNotification_S("OTP has been Sent");
                                      this.router.navigate(['./verify'])



                                    },
                                    err => {
                                      this.snakeBar.close_bar();
                                      Toaster_Service.toastNotification_S("OTP failed due to error");
                                      console.log(err);

                                    }
                                  )

                              }




                            }
                          }
                        },
                        err => {
                          this.snakeBar.close_bar();
                          Toaster_Service.toastNotification_I("Refresh Page!");
                        }
                      )
                  }
                  else {
                    this.snakeBar.close_bar();
                    Toaster_Service.toastNotification_I('Contact Admin to Create your Account')
                  }
                },
                err => {
                  console.log(err);
                  this.snakeBar.close_bar();
                }
              )

          },
          (error) => {
            this.snakeBar.close_bar();
            Toaster_Service.toastNotification_D(error);
            console.log(error);
          }
        )

    }
    else if (this.login_type == 1) //Admin
    {
      this.snakeBar.start_bar("Login in Process!");


      var encoded = EncodeDecode.b64EncodeUnicode(uname + ':' + password);
      this.freeapi.getLogin(encoded)
        .subscribe(
          (data) => {
            // this.snakeBar.close_bar();
            // console.log(data);
            let final_data = JSON.parse(JSON.stringify(data));
            this.getAccDetails = final_data;
            this.getAccDetails1 = final_data.data;
            this.getAccCurrency = final_data._currency;
            this.getsubAcc = final_data._subaccount;
            // console.log();


            this.freeapi.search_permissions(final_data.data._subaccount.subaccount_id)
              .subscribe
              (
                res => {
                  this.snakeBar.close_bar()
                  var data_P = JSON.parse((JSON.stringify(res)));
                  // console.log(data);
                  // console.log(data.http_response);
                  // console.log(data.http_response.length);


                  if (data_P.http_response.length > 0 && data_P.http_response[0].username == uname
                    && data_P.http_response[0].status == 'admin'
                    && data_P.http_response[0].banned == (0 || '0')) {
                    this.freeapi.search_user('subadmins', final_data.data._subaccount.subaccount_id)
                      .subscribe
                      (
                        res => {
                          let val1 = (JSON.parse(JSON.stringify(res)));
                          //console.log(val.http_response);
                          if (val1.http_response.length == 0) {

                            // console.log(val);
                            // this.snakeBar.close_bar();
                            // Toaster_Service.toastNotification_S("Check Console");

                            // Here to Register him...


                            // console.log(latitude+" "+longitude);
                            let latitude = this.data_security.coords.latitude;
                            let longitude = this.data_security.coords.longitude;
                            var content = {
                              "id": final_data.data._subaccount.subaccount_id,
                              "username": final_data.data._subaccount.api_username,
                              "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                              "ip_addr": latitude,
                              "device": this.getOS(),
                              "country": longitude,
                              "type": "subadmins",

                              "permissions":
                              {
                                "sms": data_P.http_response[0].access_sms,
                                "mms": data_P.http_response[0].access_mms,
                                "contacts": data_P.http_response[0].access_contacts,
                                "sms_campaigns": data_P.http_response[0].sms_campaign,
                                "templates": data_P.http_response[0].access_templates,
                                "billings": data_P.http_response[0].access_billing,
                                "top_ups": data_P.http_response[0].mobile_topup,
                                "resellers": data_P.http_response[0].access_resellers,
                                "banned": data_P.http_response[0].banned,
                              }
                            }
                            localStorage.setItem("user_data", JSON.stringify(content));
                            localStorage.setItem("user_status", "Logged_in");

                            this.shared_services.setUserData(content);
                            this.freeapi.setUserDetailsDB(final_data.data._subaccount.subaccount_id, this.uname
                              , latitude, this.getOS(), longitude, 'subadmins').subscribe
                              (
                                res => {
                                  // console.log(res);
                                  this.snakeBar.close_bar();
                                  let val: any;
                                  val = res;
                                  // console.log(val.http_response);
                                  Toaster_Service.toastNotification_S(val.http_response);
                                  this.router.navigate(['./profile'])

                                },

                                err => {
                                  console.log(err);
                                  this.snakeBar.close_bar();
                                  Toaster_Service.toastNotification_D("Error check console ->");
                                }

                              )


                          }




                          else if (val1.http_response.length > 0) {
                            let data = val1.http_response[0];
                            var content_comp = {}

                            {

                              // console.log(latitude+" "+longitude);
                              let latitude = this.data_security.coords.latitude;
                              let longitude = this.data_security.coords.longtitude;

                              content_comp = {
                                "id": final_data.data._subaccount.subaccount_id,
                                "username": final_data.data._subaccount.api_username,
                                "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                                "ip_addr": latitude,
                                "device": this.getOS(),
                                "country": longitude,
                                "type": "subadmins",
                                "permissions":
                                {
                                  "sms": data_P.http_response[0].access_sms,
                                  "mms": data_P.access_mms,
                                  "contacts": data_P.access_contacts,
                                  "sms_campaigns": data_P.sms_campaign,
                                  "templates": data_P.access_templates,
                                  "billings": data_P.access_billing,
                                  "top_ups": data_P.mobile_topup,
                                  "resellers": data_P.access_resellers,
                                  "banned": data_P.banned,
                                }

                              }

                              if (data.id == this.getAccDetails1.user_id
                                && data.username == this.uname && data.ip_addr ==
                                latitude && data.device == this.getOS()) {
                                this.snakeBar.close_bar()
                                localStorage.setItem("user_data", JSON.stringify(content_comp));
                                localStorage.setItem("user_status", "Logged_in");
                                // Navigate to profile
                                Toaster_Service.toastNotification_S("Successfully Signed!");
                                this.router.navigate(['./profile'])
                              }

                              else {
                                // this navigate to OTP.
                                console.log("Not Matched");
                                let latitude = this.data_security.coords.latitude;
                                let longitude = this.data_security.coords.longitude;

                                var val = Math.floor(1000 + Math.random() * (9000 + 54));

                                this.freeapi.sendVerificationcodebyemail(final_data.data._subaccount.email, val)
                                  .subscribe
                                  (
                                    res => {
                                      this.snakeBar.close_bar();

                                      content_comp = {
                                        "id": final_data.data._subaccount.subaccount_id,
                                        "username": final_data.data._subaccount.api_username,
                                        "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                                        "ip_addr": latitude,
                                        "device": this.getOS(),
                                        "country": longitude,
                                        "type": "subadmins",
                                        "permissions":
                                        {
                                          "sms": data_P.access_sms,
                                          "mms": data_P.access_mms,
                                          "contacts": data_P.access_contacts,
                                          "sms_campaigns": data_P.sms_campaign,
                                          "templates": data_P.access_templates,
                                          "billings": data_P.access_billing,
                                          "top_ups": data_P.mobile_topup,
                                          "resellers": data_P.access_resellers,
                                          "banned": data_P.banned,
                                        }
                                      }
                                      localStorage.setItem("user_data", JSON.stringify(content_comp));
                                      localStorage.setItem("temp_code", '' + val)
                                      Toaster_Service.toastNotification_S("OTP has been Sent");
                                      this.router.navigate(['./verify'])



                                    },
                                    err => {
                                      this.snakeBar.close_bar();
                                      Toaster_Service.toastNotification_S("OTP failed due to error");
                                      console.log(err);

                                    }
                                  )

                              }




                            }
                          }
                        },
                        err => {
                          this.snakeBar.close_bar();
                          Toaster_Service.toastNotification_I("Refresh Page!");
                        }
                      )
                  }
                  else {
                    this.snakeBar.close_bar();
                    Toaster_Service.toastNotification_I('Contact Admin to Create your Account')
                  }
                },
                err => {
                  console.log(err);
                  this.snakeBar.close_bar();
                }
              )




            // ----------------------

          },
          (error) => {
            this.snakeBar.close_bar();
            Toaster_Service.toastNotification_D(error);
            console.log(error);
          }
        )

    }
    else if (this.login_type == 2) // Reseller
    {
      this.snakeBar.start_bar("Login in Process!");


      var encoded = EncodeDecode.b64EncodeUnicode(uname + ':' + password);
      this.freeapi.getLogin(encoded)
        .subscribe(
          (data) => {
            // this.snakeBar.close_bar();
            // console.log(data);
            this.getAccDetails = data;
            this.getAccDetails1 = data.data;
            this.getAccCurrency = data._currency;
            this.getsubAcc = data._subaccount;


            this.freeapi.search_permissions(this.getAccDetails1.user_id)
              .subscribe
              (
                res => {
                  this.snakeBar.close_bar()
                  var data_P = JSON.parse((JSON.stringify(res)));
                  // console.log(data);
                  // console.log(data.http_response);
                  // console.log(data.http_response.length);


                  if (data_P.http_response.length > 0 && data_P.http_response[0].username == uname
                    && data_P.http_response[0].status == 'reseller'
                    && data_P.http_response[0].banned == (0 || '0')) {
                    this.freeapi.search_user('resellers', this.getAccDetails1.user_id)
                      .subscribe
                      (
                        res => {
                          let val1 = (JSON.parse(JSON.stringify(res)));
                          //console.log(val.http_response);
                          if (val1.http_response.length == 0) {

                            // console.log(val);
                            // this.snakeBar.close_bar();
                            // Toaster_Service.toastNotification_S("Check Console");

                            // Here to Register him...




                            // console.log(latitude+" "+longitude);
                            let latitude = this.data_security.coords.latitude;
                            let longitude = this.data_security.coords.longitude;
                            var content = {
                              "id": this.getAccDetails1.user_id,
                              "username": this.uname,
                              "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                              "ip_addr": latitude,
                              "device": this.getOS(),
                              "country": longitude,
                              "type": "resellers",

                              "permissions":
                              {
                                "sms": data_P.http_response[0].access_sms,
                                "mms": data_P.http_response[0].access_mms,
                                "contacts": data_P.http_response[0].access_contacts,
                                "sms_campaigns": data_P.http_response[0].sms_campaign,
                                "templates": data_P.http_response[0].access_templates,
                                "billings": data_P.http_response[0].access_billing,
                                "top_ups": data_P.http_response[0].mobile_topup,
                                "resellers": data_P.http_response[0].access_resellers,
                                "banned": data_P.http_response[0].banned,
                              }
                            }
                            localStorage.setItem("user_data", JSON.stringify(content));
                            localStorage.setItem("user_status", "Logged_in");

                            this.shared_services.setUserData(content);
                            this.freeapi.setUserDetailsDB(this.getAccDetails1.user_id, this.uname
                              , latitude, this.getOS(), longitude, 'resellers').subscribe
                              (
                                res => {
                                  // console.log(res);
                                  this.snakeBar.close_bar();
                                  let val: any;
                                  val = res;
                                  console.log(val.http_response);
                                  Toaster_Service.toastNotification_S(val.http_response);
                                  this.router.navigate(['./profile'])

                                },

                                err => {
                                  console.log(err);
                                  this.snakeBar.close_bar();
                                  Toaster_Service.toastNotification_D("Error check console ->");
                                }

                              )


                          }




                          else if (val1.http_response.length > 0) {
                            let data = val1.http_response[0];
                            var content_comp = {}

                            {



                              // console.log(latitude+" "+longitude);
                              let latitude = this.data_security.coords.latitude;
                              let longitude = this.data_security.coords.longtitude;

                              content_comp = {
                                "id": this.getAccDetails1.user_id,
                                "username": this.uname,
                                "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                                "ip_addr": latitude,
                                "device": this.getOS(),
                                "country": longitude,
                                "type": "resellers",
                                "permissions":
                                {
                                  "sms": data_P.http_response[0].access_sms,
                                  "mms": data_P.http_response[0].access_mms,
                                  "contacts": data_P.http_response[0].access_contacts,
                                  "sms_campaigns": data_P.http_response[0].sms_campaign,
                                  "templates": data_P.http_response[0].access_templates,
                                  "billings": data_P.http_response[0].access_billing,
                                  "top_ups": data_P.http_response[0].mobile_topup,
                                  "resellers": data_P.http_response[0].access_resellers,
                                  "banned": data_P.http_response[0].banned,
                                }

                              }

                              if (data.id == this.getAccDetails1.user_id
                                && data.username == this.uname && data.ip_addr ==
                                latitude && data.device == this.getOS()) {
                                this.snakeBar.close_bar()
                                localStorage.setItem("user_data", JSON.stringify(content_comp));
                                localStorage.setItem("user_status", "Logged_in");
                                // Navigate to profile
                                Toaster_Service.toastNotification_S("Successfully Signed!");
                                this.router.navigate(['./profile'])
                              }

                              else {
                                // this navigate to OTP.
                                console.log("Not Matched");
                                let latitude = this.data_security.coords.latitude;
                                let longitude = this.data_security.coords.longitude;

                                var val = Math.floor(1000 + Math.random() * (9000 + 54));

                                this.freeapi.sendVerificationcodebyemail(this.getAccDetails1.account_billing_email, val)
                                  .subscribe
                                  (
                                    res => {
                                      this.snakeBar.close_bar();

                                      content_comp = {
                                        "id": this.getAccDetails1.user_id,
                                        "username": this.uname,
                                        "passcode": EncodeDecode.b64EncodeUnicode(this.passcode),
                                        "ip_addr": latitude,
                                        "device": this.getOS(),
                                        "country": longitude,
                                        "type": "resellers",
                                        "permissions":
                                        {
                                          "sms": data_P.http_response[0].access_sms,
                                          "mms": data_P.http_response[0].access_mms,
                                          "contacts": data_P.http_response[0].access_contacts,
                                          "sms_campaigns": data_P.http_response[0].sms_campaign,
                                          "templates": data_P.http_response[0].access_templates,
                                          "billings": data_P.http_response[0].access_billing,
                                          "top_ups": data_P.http_response[0].mobile_topup,
                                          "resellers": data.access_resellers,
                                          "banned": data_P.http_response[0].banned,
                                        }
                                      }
                                      localStorage.setItem("user_data", JSON.stringify(content_comp));
                                      localStorage.setItem("temp_code", '' + val)
                                      Toaster_Service.toastNotification_S("OTP has been Sent");
                                      this.router.navigate(['./verify'])



                                    },
                                    err => {
                                      this.snakeBar.close_bar();
                                      Toaster_Service.toastNotification_S("OTP failed due to error");
                                      console.log(err);

                                    }
                                  )

                              }




                            }
                          }
                        },
                        err => {
                          this.snakeBar.close_bar();
                          Toaster_Service.toastNotification_I("Refresh Page!");
                        }
                      )
                  }
                  else {
                    this.snakeBar.close_bar();
                    Toaster_Service.toastNotification_I('Contact Admin to Create your Account')
                  }
                },
                err => {
                  console.log(err);
                  this.snakeBar.close_bar();
                }
              )

          },
          (error) => {
            this.snakeBar.close_bar();
            Toaster_Service.toastNotification_D(error);
            console.log(error);
          }
        )

    }
    else {
      this.snakeBar.close_bar();
      Toaster_Service.toastNotification_I("Please select from type first!");

    }
  }








  public async Login1(username: string, password: string) {



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
      os = '';

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



  // public forget_chk(id:string )
  // {

  //   // console.log(id);
  //   {

  //     switch (id){
  //       case 'forget_user':
  //         if (this.i>0 )
  //         {
  //           let val =  $('#uname').val();
  //           if(val!='')
  //           {

  //            var users = new forget_username();

  //          {
  //            users.email = val;
  //            users.phone_number = '';
  //            this.freeapi.Send_forget_notify(users)
  //              .subscribe(
  //                res => {
  //                  console.log(res);
  //                  this.forget_username_resp = res;
  //                  alert(this.forget_username_resp.response_msg );
  //                  $('#uname').val('');
  //                  $('#uname').attr("placeholder","Username");
  //                  this.i=0;


  //                },
  //                err => {
  //                  alert("Error found");
  //                  $('#uname').val('');
  //                  // $('#uname').attr("placeholder","Username");
  //                  // this.i = 0;
  //                }
  //              )

  //          }
  //           }
  //           this.i=0;
  //         }
  //         else{
  //           $('#uname').attr("placeholder","Type your Email!");
  //           this.i++;
  //         }
  //        break;



  //       case 'forget_pass':
  //         var sd = $('#uname').attr('placeholder')
  //         if( sd='Username' )
  //         {
  //           if($("#uname").val()!='')
  //           {
  //             var a = $("#uname").val()
  //             var forgets = new forget_password();
  //             forgets.user_name = a;
  //             // console.log(a);

  //             this.freeapi.Send_forget_passcode(forgets)
  //             .subscribe(
  //               res=>
  //               {
  //                 this.forget_username_resp = res;
  //                 $("#uname").val('');
  //                 alert(this.forget_username_resp.response_msg);
  //               },
  //               err=>
  //               {
  //                 alert("Error: "+err);
  //               }
  //             )
  //           }
  //           else{
  //             $('#uname').attr('placeholder','Username');
  //             alert('Type your Username')

  //           }
  //         }
  //         else{
  //           $('#uname').attr('placeholder','Username');
  //           alert("Type your Username!")
  //         }
  //         break;
  //     }
  //   }
  // }







}


