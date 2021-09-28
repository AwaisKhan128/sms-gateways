import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { SMSHistoryDatum, SMSHistoryResponse } from 'src/app/Classes/SMS/sms_history_response';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  sms_history_array: SMSHistoryDatum[] =  [];
  

  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
    this.actionFetchSMSHistory()
  }

  actionFetchSMSHistory() {
    this.apiService.getSMSHisory().subscribe(
      response => {
        //this.sms_History = response.data?.data
        const smsArray =  response.data?.data
        this.sms_history_array = smsArray as SMSHistoryDatum[]
      }
    );
  }

  actionFetchMMSHistory() {
    this.apiService.getMMSHistory().subscribe(
      response => {
        //this.sms_History = response.data?.data
        const smsArray =  response.data?.data
        this.sms_history_array = smsArray as SMSHistoryDatum[]
      }
    )
  };

}
