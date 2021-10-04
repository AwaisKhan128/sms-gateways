import { Component, OnInit } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { HistoryResponse, HistoryDatum } from 'src/app/Classes/SMS/sms_history_response';
import { forkJoin } from 'rxjs';
import { CLICKSEND_STATISTICS_TYPE, MESSAGE_STATUS_TYPE } from 'src/app/APIS/APIConfig';
import { Message } from 'src/app/Classes/SMS/send_sms_response';
import { DateHandler } from 'src/app/Helper/datehandler';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { PageEvent } from '@angular/material/paginator';
import { Toaster } from 'src/app/Helper/toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpledialogComponent } from '../simpledialog/simpledialog.component';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { MMsMessage } from 'src/app/Classes/MMS/send_mms_param';
import * as $ from 'jquery';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  sms_history_array: HistoryDatum[] =  [];
  filtered_history_array: HistoryDatum[] = [];
  resendMessages: HistoryDatum[] = [];

  messageTo: string =  "0"; //"+61411111111,+61422222222";
  messageFrom: string =  "0"

  search_param_messageType: string = "ALL"
  search_param_messageStatus: string = "ALL"
  
  pageEvent!: PageEvent;
  pageLength = 0;
  pageIndex: number = 0;
  pageSize: number = 15;


  constructor(private apiService: API_Services, private modalService: NgbModal) { }

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
  
  actionSearch() {
    // console.log("search param "+this.search_param_messageType)
    // console.log("search param index "+this.pageIndex)
    // console.log("search param size "+this.pageSize)
    this.actionFetchHistory(this.search_param_messageType)
  }
  
  actionFetchHistory(history_type : string = "ALL") {
    this.messageFrom = (this.messageFrom !== "" || this.messageFrom !== undefined || this.messageFrom !== null) ? this.messageFrom : "0"
    var messageFromUnixTimestamp = DateHandler.convertDateToUnixTimestamp(this.messageFrom)

    this.messageTo = (this.messageTo !== "" || this.messageTo !== undefined || this.messageTo !== null || isNaN(this.messageTo) == false) ? this.messageTo : "0"
    if (this.messageTo == null) {
      this.messageTo = "0"
    }
    var messageToUnixTimestamp = DateHandler.convertDateToUnixTimestamp(this.messageTo)
    if(history_type == "SMS") {
      
      this.pageIndex += 1
      this.apiService.getSMSHisory(messageFromUnixTimestamp, messageToUnixTimestamp).subscribe(
        response => {
          const smsArray =  response.data?.data
          this.sms_history_array = smsArray as HistoryDatum[]
          this.sms_history_array.map(e=> e.message_type = "SMS")
          this.applyfilteringOnThisData()
        }
      );
    }
    else if(history_type == "MMS"){
      this.apiService.getMMSHistory(messageFromUnixTimestamp, messageToUnixTimestamp).subscribe(
        response => {
          const mmsArray =  response.data?.data//?.map(i => i.message_type = "mms")
          this.sms_history_array = mmsArray as HistoryDatum[]
          this.sms_history_array.map(e=> e.message_type = "MMS")
          this.applyfilteringOnThisData()
        }
      )
    }
    else {
      const call_sms_api = this.apiService.getSMSHisory(messageFromUnixTimestamp, messageToUnixTimestamp)
      const call_mms_api = this.apiService.getMMSHistory(messageFromUnixTimestamp, messageToUnixTimestamp)
      forkJoin([call_sms_api,call_mms_api]).subscribe( responses =>{
        var smsArray =  responses[0].data?.data  as HistoryDatum[]
        var mmsArray =  responses[1].data?.data  as HistoryDatum[]
        this.sms_history_array = []
        smsArray.map(sms => {
          sms.message_type = "SMS"
          this.sms_history_array.push(sms)
        })
        mmsArray.map(mms => {
          mms.message_type = "MMS"
          this.sms_history_array.push(mms)
        })
        this.applyfilteringOnThisData()
      })
    }

  }

  applyfilteringOnThisData() {
    if (this.sms_history_array.length > 0 && this.search_param_messageStatus.toLowerCase() !== "all") {
      this.filtered_history_array = this.sms_history_array.filter((m:HistoryDatum) => m.status!.toLowerCase() === this.search_param_messageStatus.toLowerCase())
    }
    else {
      this.filtered_history_array = this.sms_history_array
    }
  }

  actionSMSHistoryExport(toExport: string) {
    if (toExport.toLowerCase() == "sms") {
      this.apiService.getExportSMSHistory("sms_history")
      .subscribe(response => {
          var url = response.data?.url!
          if (url != null || url != undefined || url != ""){
            this.apiService.getFileMessageHistory(url).subscribe( t => 
              this.downLoadFile(t, "text/csv")
            )
          }
      })
    }
    else if (toExport.toLowerCase() == "mms") {
      this.apiService.getExportMMSHistory()
      .subscribe(response => {
          var url = response.data?.url!
          if (url != null || url != undefined || url != ""){
            this.apiService.getFileMessageHistory(url).subscribe( t => 
              this.downLoadFile(t, "text/csv")
            )
          }
      }) 
    }
  }

  onScheduler_resend(event: any) {
    const messageID = <string>event.target.value;
    if ($('#'+messageID).prop('checked')) {
      this.sms_history_array.forEach(t=> { 
        if (t.message_id! == messageID) {
          this.resendMessages.push(t)
        }
      })
      console.log("add in resend arrar message with ID =>"+messageID)
      //console.log("add length "+  this.resendMessages.length)
    }
    else
    {
      var tempArr = this.resendMessages
      this.resendMessages = []
      tempArr.forEach(t=> { 
        if (t.message_id! !== messageID) {
          this.resendMessages.push(t)
        }
      })
      console.log("removed  in resend arrar message with ID =>"+messageID)
      //console.log("removed length "+this.resendMessages.length)
    }
  }
  
  actionResendMessages() {
    var filtered_smsMessages: HistoryDatum[] = [];
    var filtered_mmsMessages : HistoryDatum[] = []
    this.resendMessages.forEach(e=>{
      var mType = e.message_type!.toLowerCase() as string
      if (mType == "sms") {
        filtered_smsMessages.push(e)
      }
      else {
        filtered_mmsMessages.push(e)
      }
    })
    if(filtered_smsMessages.length > 0) {
      filtered_smsMessages.forEach( e=> {
        const m : MyMessage = {
          body : e.body!,
          to : e.to!,
          from : e.from!,
        };
        const param : SendSMSParam = {messages: [m]};
          this.apiService.sendSMS(param)
            .subscribe(response => {
              if (response.response_code == "SUCCESS") {
                Toaster.sucessToast(response.response_msg!)
              }
              else {
                Toaster.failureToast(response.response_code!, response.response_msg!)
              }
        });
      })
    }
    if (filtered_mmsMessages.length > 0) {
      filtered_mmsMessages.forEach( e=> {
        const mms_message : MMsMessage = {
          source : "node.js",
          to: e.to!,
          from : e.from!,
          subject : e.subject!,
          body : e.body!,
        }
        const param : SendSMSParam = {messages: [mms_message]};
          this.apiService.sendMMS(param)
            .subscribe(response => {
              if (response.response_code == "SUCCESS") {
                Toaster.sucessToast(response.response_msg!)
              }
              else {
                Toaster.failureToast(response.response_code!, response.response_msg!)
              }
        });
      })
    }
    if (this.resendMessages.length <= 0) {
        Toaster.failureToast("Failed","Please select a message to resend")
    }
  }

  openExportDialog() {
    this.modalService.open(SimpledialogComponent, { ariaLabelledBy: 'modal-basic-title', centered:true, size:'l' }).result.then((result) => {
      console.log($(result));
    }, (reason) => {
      console.log("reason is "+reason)
        this.actionSMSHistoryExport(reason)
    });
  }

    /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
      downLoadFile(data: any, type: string) {
      let blob = new Blob([data], { type: type});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }
  }
}


