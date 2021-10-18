import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operator-configuration',
  templateUrl: './operator-configuration.component.html',
  styleUrls: ['./operator-configuration.component.css']
})
export class OperatorConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  Operator(){
    $("#operator").addClass('active');
    $("#add_sms").removeClass('active');
    $("#add_ussd").removeClass('active');
    $("#send_sms").removeClass('active');
    $("#send_ussd").removeClass('active');

  }
  Add_SMS()
  {
    $("#add_sms").addClass('active');
    $("#operator").removeClass('active');
    $("#add_ussd").removeClass('active');
    $("#send_sms").removeClass('active');
    $("#send_ussd").removeClass('active');
  }
  Add_USSD()
  {
    $("#add_ussd").addClass('active');
    $("#add_sms").removeClass('active');
    $("#operator").removeClass('active');
    $("#send_sms").removeClass('active');
    $("#send_ussd").removeClass('active');
  }
  Send_SMS()
  {
    $("#send_sms").addClass('active');
    $("#add_sms").removeClass('active');
    $("#add_ussd").removeClass('active');
    $("#operator").removeClass('active');
    $("#send_ussd").removeClass('active');
  }

  Send_USSD()
  {
    $("#send_ussd").addClass('active');
    $("#add_sms").removeClass('active');
    $("#add_ussd").removeClass('active');
    $("#send_sms").removeClass('active');
    $("#operator").removeClass('active');

  }

}
