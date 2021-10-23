import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { MMsMessage, SendMMSParam } from 'src/app/Classes/MMS/send_mms_param';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { SendResponse } from 'src/app/Classes/SMS/send_sms_response';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { SMSTemplate } from 'src/app/Classes/SMS/view_sms_templates_response';
import { DatePipe } from '@angular/common';
import { Toaster } from 'src/app/Helper/toaster';
import { DateHandler } from 'src/app/Helper/datehandler';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css','./sender.component.scss']
})
export class SenderComponent implements OnInit {
// My 
  ngOnInit(): void {

  }

  public smsSelected()
  {
    $("#sms").addClass('active');
    $("#sms_remote").removeClass('active');
    $("#mms").removeClass('active');
  }

  public remoteSMSSelected()
  {
    $("#sms_remote").addClass('active');
    $("#sms").removeClass('active');
    $("#mms").removeClass('active');
  }

  public mmsSelected()
  {
    $("#mms").addClass('active');
    $("#sms_remote").removeClass('active');
    $("#sms").removeClass('active');
  }
}

