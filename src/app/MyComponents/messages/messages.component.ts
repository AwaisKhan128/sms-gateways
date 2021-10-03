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


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  sms_history_array: HistoryDatum[] =  [];
  filtered_history_array: HistoryDatum[] = [];
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

  actionFetchHistory(history_type : string = "ALL") {
    // this.messageFrom = (this.messageFrom !== "" || this.messageFrom !== undefined || this.messageFrom !== null) ? this.messageFrom : "0"
    // var messageFromUnixTimestamp = DateHandler.convertDateToUnixTimestamp(this.messageFrom)

    // this.messageTo = (this.messageTo !== "" || this.messageTo !== undefined || this.messageTo !== null || isNaN(this.messageTo) == false) ? this.messageTo : "0"
    // if (this.messageTo == null) {
    //   this.messageTo = "0"
    // }
    // if(history_type == "SMS") {
      
      //var messageToUnixTimestamp = DateHandler.convertDateToUnixTimestamp(this.messageTo)
      this.pageIndex += 1
      console.log("search param index insideee "+this.pageIndex)
      console.log("search param size insideee"+this.pageSize)
      this.apiService.getSMSHisory(this.pageIndex,this.pageSize).subscribe(
        response => {
          const smsArray =  response.data?.data
          this.sms_history_array = smsArray as HistoryDatum[]
          this.sms_history_array.map(e=> e.message_type = "SMS")
          this.applyfilteringOnThisData()
          // this.pageIndex = response.data?.current_page!
          // this.pageSize = response.data?.per_page!
          this.pageLength = response.data!.total!
        }
      );
    // }
    // else if(history_type == "MMS"){
    //   this.apiService.getMMSHistory().subscribe(
    //     response => {
    //       const mmsArray =  response.data?.data//?.map(i => i.message_type = "mms")
    //       this.sms_history_array = mmsArray as HistoryDatum[]
    //       this.sms_history_array.map(e=> e.message_type = "MMS")
    //       this.applyfilteringOnThisData()
    //     }
    //   )
    // }
    // else {
      // const call_sms_api = this.apiService.getSMSHisory(1632817220, 1632903620)
      // const call_mms_api = this.apiService.getMMSHistory()
      // forkJoin([call_sms_api,call_mms_api]).subscribe( responses =>{
      //   var smsArray =  responses[0].data?.data  as HistoryDatum[]
      //   var mmsArray =  responses[1].data?.data  as HistoryDatum[]
      //   smsArray.map(sms => {
      //     sms.message_type = "SMS"
      //     this.sms_history_array.push(sms)
      //   })
      //   mmsArray.map(mms => {
      //     mms.message_type = "MMS"
      //     this.sms_history_array.push(mms)
      //   })
      // })
    // }

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

  actionSearch() {
    // console.log("search param "+this.search_param_messageType)
    // console.log("search param index "+this.pageIndex)
    // console.log("search param size "+this.pageSize)
    //this.actionFetchHistory(this.search_param_messageType)
  }

  
  public getPaginatorData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize == 0 ? 15 : event.pageSize
    // console.log("search param index "+this.pageIndex)
    // console.log("search param size "+this.pageSize)
    this.actionSearch()
    return event;
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


