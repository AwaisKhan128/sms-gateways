import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { HistoryResponse, HistoryDatum } from 'src/app/Classes/SMS/sms_history_response';
import { forkJoin } from 'rxjs';
import { CLICKSEND_STATISTICS_TYPE, MESSAGE_STATUS_TYPE } from 'src/app/APIS/APIConfig';
import { Message } from 'src/app/Classes/SMS/send_sms_response';
import { DateHandler } from 'src/app/Helper/datehandler';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  sms_history_array: HistoryDatum[] =  [];
  filtered_history_array: HistoryDatum[] = [];
  messageTo: string =  ""; //"+61411111111,+61422222222";
  messageFrom: string =  ""

  search_param_messageType: string = "ALL"
  search_param_messageStatus: string = "ALL"

  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
    this.actionSearch()
  }

  onMessageTypeChange(event: any) {
    const messageType = <string>event.target.value;
    this.search_param_messageType = messageType
    console.log(this.search_param_messageType)
  }
  
  onMessageStatusTypeChange(event: any) {
    const messageStatusType = <MESSAGE_STATUS_TYPE>event.target.value;
    this.search_param_messageStatus = messageStatusType
    console.log(this.search_param_messageStatus)
  }

  actionFetchHistory(history_type : string = "ALL") {
    var messageFromUnixTimestamp = (this.messageFrom !== "" || this.messageFrom !== undefined) ? this.messageFrom : 0
    messageFromUnixTimestamp = DateHandler.convertDateToUnixTimestamp(this.messageFrom)
    //messageToUnixTimestamp = DateHandler.convertDateToUnixTimestamp(this.messageTo)
    if(history_type == "SMS") {
      this.apiService.getSMSHisory(messageFromUnixTimestamp).subscribe(
        response => {
          const smsArray =  response.data?.data
          this.sms_history_array = smsArray as HistoryDatum[]
          this.sms_history_array.map(e=> e.message_type = "SMS")
        }
      );
    }
    else if(history_type == "MMS"){
      this.apiService.getMMSHistory().subscribe(
        response => {
          const mmsArray =  response.data?.data//?.map(i => i.message_type = "mms")
          this.sms_history_array = mmsArray as HistoryDatum[]
          this.sms_history_array.map(e=> e.message_type = "MMS")
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
      })
    }
    this.applyfilteringOnThisData()
  }

  applyfilteringOnThisData() {
    if (this.sms_history_array.length > 0 && this.search_param_messageStatus.toLowerCase() !== "all") {
      this.filtered_history_array = this.sms_history_array.filter((m:HistoryDatum) => m.status!.toLowerCase() === this.search_param_messageStatus.toLowerCase())
    }
    else {
      this.filtered_history_array = this.sms_history_array
    }
  }

  actionSearch() {
    console.log("search param "+this.search_param_messageType)
    this.actionFetchHistory(this.search_param_messageType)
  }

}


