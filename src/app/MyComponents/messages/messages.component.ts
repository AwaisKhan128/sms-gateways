import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { HistoryResponse, HistoryDatum } from 'src/app/Classes/SMS/sms_history_response';
import { forkJoin } from 'rxjs';
import { CLICKSEND_STATISTICS_TYPE, MESSAGE_STATUS_TYPE } from 'src/app/APIS/APIConfig';
import { Message } from 'src/app/Classes/SMS/send_sms_response';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  sms_history_array: HistoryDatum[] =  [];
  filtered_history_array: HistoryDatum[] = [];

  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
    this.actionFetchHistory(2)
  }

  onMessageTypeChange(event: any) {
    const messageType = <string>event.target.value;
    console.log(messageType)
    if (messageType == "0") {
      console.log("SMS")
        this.actionFetchHistory(0)
    }
    else if (messageType == "1") {
      console.log("MMS")
      this.actionFetchHistory(1)
    }
    else {
      console.log("ALL")
      this.actionFetchHistory()
    }
  }
  
  onMessageStatusTypeChange(event: any) {
    const messageStatusType = <MESSAGE_STATUS_TYPE>event.target.value;
    console.log(messageStatusType)
    this.actionRetrieveByMessageStatus(messageStatusType)
  }

  actionFetchHistory(history_type : CLICKSEND_STATISTICS_TYPE = 2) {
    if(history_type == 0) {
      this.apiService.getSMSHisory().subscribe(
        response => {
          const smsArray =  response.data?.data
          this.sms_history_array = smsArray as HistoryDatum[]
          this.sms_history_array.map(e=> e.message_type = "SMS")
          this.filtered_history_array = this.sms_history_array
        }
      );
    }
    else if(history_type == 1){
      this.apiService.getMMSHistory().subscribe(
        response => {
          const mmsArray =  response.data?.data//?.map(i => i.message_type = "mms")
          this.sms_history_array = mmsArray as HistoryDatum[]
          this.sms_history_array.map(e=> e.message_type = "MMS")
          this.filtered_history_array = this.sms_history_array
        }
      )
    }
    else {
      const call_sms_api = this.apiService.getSMSHisory(1632817220, 1632903620)
      const call_mms_api = this.apiService.getMMSHistory()
      forkJoin([call_sms_api,call_mms_api]).subscribe( responses =>{
        var smsArray =  responses[0].data?.data  as HistoryDatum[]
        var mmsArray =  responses[1].data?.data  as HistoryDatum[]
        smsArray.map(sms => {
          sms.message_type = "SMS"
          this.sms_history_array.push(sms)
        })
        mmsArray.map(mms => {
          mms.message_type = "MMS"
          this.sms_history_array.push(mms)
        })
        this.filtered_history_array = this.sms_history_array
      })
    }
  }

  actionRetrieveByMessageStatus(type: MESSAGE_STATUS_TYPE) {
    if (this.sms_history_array.length > 0 && type !== "all") {
      console.log(1)
      this.filtered_history_array = this.sms_history_array.filter((m:HistoryDatum) => m.status!.toLowerCase() === type)
    }
    else {
      this.filtered_history_array = this.sms_history_array
    }
  }

}


