import { Component, OnInit, ViewChild } from '@angular/core';
import { API_Services } from 'src/app/APIS/freeapi.service';
import {
  HistoryResponse,
  HistoryDatum,
} from 'src/app/Classes/SMS/sms_history_response';
import { forkJoin } from 'rxjs';
import {
  CLICKSEND_STATISTICS_TYPE,
  MESSAGE_STATUS_TYPE,
} from 'src/app/APIS/APIConfig';
import { Message } from 'src/app/Classes/SMS/send_sms_response';
import { DateHandler } from 'src/app/Helper/datehandler';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Toaster } from 'src/app/Helper/toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpledialogComponent } from '../simpledialog/simpledialog.component';
import { MyMessage, SendSMSParam } from 'src/app/Classes/SMS/send_sms_param';
import { MMsMessage } from 'src/app/Classes/MMS/send_mms_param';
import * as $ from 'jquery';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Snake_Waiting } from 'src/app/Classes/Waiting_bar';
import { HTTPResponseSubscribedDevices } from 'src/app/Classes/subscribed_devices';
import {
  SubscribedDevicesRemoteMessagesResponse,
  SubscribedDevicesRemoteMessage,
} from 'src/app/Classes/subscribed_devices_remote_messages';
import { HTTPResponseSubscribedDeviceSim } from 'src/app/Classes/subscribed_devices_sim';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  sms_history_array: HistoryDatum[] = [];
  filtered_history_array: HistoryDatum[] = [];
  resendMessages: HistoryDatum[] = [];

  subscribedDevices: HTTPResponseSubscribedDevices[] = [];
  sims: HTTPResponseSubscribedDeviceSim[] = [];
  userSearchedForRemoteMessages = 0;
  remoteMessages: SubscribedDevicesRemoteMessage[] = [];
  userSelectDeviceSim = '0';

  messageTo: string = '0'; //"+61411111111,+61422222222";
  messageFrom: string = '0';

  search_param_selected_subscribed_device_ID: number = -1;
  search_param_messageType: string = 'ALL';
  search_param_messageStatus: string = 'ALL';

  //Pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  search_param_page_length: number = 0;
  search_param_page_index: number = 1;
  search_param_page_size: number = 15;
  donot_load_paginator: number = 1;
  data: any;
  search_param_selected_subscribed_ID: any;

  constructor(
    private apiService: API_Services,
    private modalService: NgbModal,
    private snakeBar: Snake_Waiting
  ) {}

  ngOnInit(): void {
    this.donot_load_paginator = 1;
    this.snakeBar.start_bar('Please Wait');
    this.actionSearch();

    let json = localStorage.getItem('user_data');

    if (json != null) {
      this.data = JSON.parse(json);
      let id = this.data.id;
      this.getSubscribedDevices(id);
    }
  }

  onMessageTypeChange(event: any) {
    this.snakeBar.start_bar('Please Wait');
    const messageType = <string>event.target.value;
    this.search_param_messageType = messageType;
    console.log(this.search_param_messageType);
    this.snakeBar.close_bar();
  }

  onMessageStatusTypeChange(event: any) {
    this.snakeBar.start_bar('Please Wait');
    const messageStatusType = <MESSAGE_STATUS_TYPE>event.target.value;
    this.search_param_messageStatus = messageStatusType;
    console.log(this.search_param_messageStatus);
    this.snakeBar.close_bar();
  }

  actionSearch() {
    if (this.donot_load_paginator == 0) {
      this.paginator.firstPage();
    } else {
      this.donot_load_paginator = 0;
    }
    if (this.search_param_selected_subscribed_device_ID > -1) {
      this.actionFetchSubscribedDeviceRemoteMessages();
    } else {
      this.actionFetchHistory(this.search_param_messageType);
    }
  }

  actionFetchHistory(history_type: string = 'ALL') {
    this.messageFrom =
      this.messageFrom !== '' ||
      this.messageFrom !== undefined ||
      this.messageFrom !== null
        ? this.messageFrom
        : '0';
    var messageFromUnixTimestamp = DateHandler.convertDateToUnixTimestamp(
      this.messageFrom
    );

    this.messageTo =
      this.messageTo !== '' ||
      this.messageTo !== undefined ||
      this.messageTo !== null ||
      isNaN(this.messageTo) == false
        ? this.messageTo
        : '0';

    if (this.messageTo == null) {
      this.messageTo = '0';
    }
    let json = localStorage.getItem('user_data');
    var messageToUnixTimestamp = DateHandler.convertDateToUnixTimestamp(
      this.messageTo
    );
    if (history_type == 'SMS') {
      let json = localStorage.getItem('user_data');

      if (json != null) {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username + ':' + password);

        this.apiService
          .getSMSHisory(
            auths,
            messageFromUnixTimestamp,
            messageToUnixTimestamp,
            this.search_param_page_index,
            this.search_param_page_size
          )
          .subscribe((response) => {
            var total = response.data?.total! as number;
            this.search_param_page_length = total;
            const smsArray = response.data?.data;
            this.sms_history_array = smsArray as HistoryDatum[];
            this.sms_history_array.map((e) => (e.message_type = 'SMS'));
            this.applyfilteringOnThisData();
            this.snakeBar.close_bar();
          });
      }
    } else if (history_type == 'MMS') {
      if (json != null) {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username + ':' + password);

        this.apiService
          .getMMSHistory(
            auths,
            messageFromUnixTimestamp,
            messageToUnixTimestamp,
            this.search_param_page_index,
            this.search_param_page_size
          )
          .subscribe((response) => {
            var total = response.data?.total! as number;
            this.search_param_page_length = total;
            const mmsArray = response.data?.data; //?.map(i => i.message_type = "mms")
            this.sms_history_array = mmsArray as HistoryDatum[];
            this.sms_history_array.map((e) => (e.message_type = 'MMS'));
            this.applyfilteringOnThisData();
            this.snakeBar.close_bar();
          });
      }
    } else {
      if (json != null) {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username + ':' + password);

        const call_sms_api = this.apiService.getSMSHisory(
          auths,
          messageFromUnixTimestamp,
          messageToUnixTimestamp,
          this.search_param_page_index,
          this.search_param_page_size
        );
        const call_mms_api = this.apiService.getMMSHistory(
          auths,
          messageFromUnixTimestamp,
          messageToUnixTimestamp,
          this.search_param_page_index,
          this.search_param_page_size
        );
        forkJoin([call_sms_api, call_mms_api]).subscribe((responses) => {
          var smsArray = responses[0].data?.data as HistoryDatum[];
          var mmsArray = responses[1].data?.data as HistoryDatum[];
          var total = (responses[0].data?.total! +
            responses[1].data?.total!) as number;
          this.search_param_page_length = total;
          this.sms_history_array = [];
          smsArray.map((sms) => {
            sms.message_type = 'SMS';
            this.sms_history_array.push(sms);
          });
          mmsArray.map((mms) => {
            mms.message_type = 'MMS';
            this.sms_history_array.push(mms);
          });
          this.snakeBar.close_bar();
          this.applyfilteringOnThisData();
        });
      }
    }
  }

  // actionFetchSubscribedDeviceRemoteMessages() {

  //   let json = localStorage.getItem("user_data");

  //   if(json!=null)
  //   {
  //       this.data = JSON.parse(json);
  //       let id = this.data.id;
  //       this.search_param_selected_subscribed_ID = id;

  //       this.apiService.getSubscribedDevicesRemoteMessages(id).subscribe(
  //         e => {
  //           // const msgs = e.SubscribedDevicesRemoteMessage as SubscribedDevicesRemoteMessage[]
  //           // this.remoteMessages = msgs
  //           // this.sms_history_array = []

  //           // //HistoryDatum
  //           // this.remoteMessages.forEach(i =>{
  //           //   const k : HistoryDatum = {
  //           //     direction:   i.direction,
  //           //     date:          +i.date!,
  //           //     to:            i.to_num,
  //           //     body:          i.body,
  //           //     status:        i.status,
  //           //     from:          i.from_num,
  //           //     schedule:      "",
  //           //     status_code:   null,
  //           //     status_text:   i.status,
  //           //     error_code:    null,
  //           //     error_text:    null,
  //           //     message_id:    i.id!.toString(),
  //           //     message_parts: i.id,
  //           //     message_price: i.cost,
  //           //     from_email:    null,
  //           //     list_id:       null,
  //           //     custom_string: "",
  //           //     contact_id:    null,
  //           //     user_id:       0,
  //           //     subaccount_id: 0,
  //           //     country:       "",
  //           //     carrier:       "",
  //           //     first_name:    null,
  //           //     last_name:     null,
  //           //     _api_username: "",
  //           //     date_added:      0,
  //           //     _media_file_url: "",
  //           //     subject:         "",
  //           //     priority:        1,
  //           //     message_type:    i.type
  //           //   }
  //           //   this.sms_history_array.push(k)
  //           // })
  //           // this.filtered_history_array = this.sms_history_array
  //           // console.log("length of the remote message is"+msgs!)
  //           // this.snakeBar.close_bar();
  //         }
  //       )
  //   }

  // }

  applyfilteringOnThisData() {
    if (
      this.sms_history_array.length > 0 &&
      this.search_param_messageStatus.toLowerCase() !== 'all'
    ) {
      this.filtered_history_array = this.sms_history_array.filter(
        (m: HistoryDatum) =>
          m.status!.toLowerCase() ===
          this.search_param_messageStatus.toLowerCase()
      );
      if (this.filtered_history_array.length == 0) {
        this.search_param_page_length = 0;
      }
    } else {
      this.filtered_history_array = this.sms_history_array;
    }
  }

  actionSMSHistoryExport(toExport: string) {
    this.snakeBar.start_bar('Please wait!');
    let json = localStorage.getItem('user_data');
    if (toExport.toLowerCase() == 'sms') {
      if (json != null) {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username + ':' + password);

        this.apiService
          .getExportSMSHistory(auths, 'sms_history')
          .subscribe((response) => {
            var url = response.data?.url!;
            if (url != null || url != undefined || url != '') {
              this.apiService
                .getFileMessageHistory(url)
                .subscribe((t) => this.downLoadFile(t, 'text/csv'));
              this.snakeBar.close_bar();
            }
          });
      }
    } else if (toExport.toLowerCase() == 'mms') {
      if (json != null) {
        this.data = JSON.parse(json);
        let username = this.data.username;
        let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
        var auths = EncodeDecode.b64EncodeUnicode(username + ':' + password);

        this.apiService.getExportMMSHistory(auths).subscribe((response) => {
          var url = response.data?.url!;
          if (url != null || url != undefined || url != '') {
            this.apiService
              .getFileMessageHistory(url)
              .subscribe((t) => this.downLoadFile(t, 'text/csv'));
            this.snakeBar.close_bar();
          }
        });
      }
    }
  }

  onScheduler_resend(event: any) {
    this.snakeBar.start_bar('Please Wait');
    const messageID = <string>event.target.value;
    if ($('#' + messageID).prop('checked')) {
      this.sms_history_array.forEach((t) => {
        if (t.message_id! == messageID) {
          this.resendMessages.push(t);
          this.snakeBar.close_bar();
        }
      });
      console.log('add in resend arrar message with ID =>' + messageID);
      //console.log("add length "+  this.resendMessages.length)
    } else {
      var tempArr = this.resendMessages;
      this.resendMessages = [];
      tempArr.forEach((t) => {
        if (t.message_id! !== messageID) {
          this.resendMessages.push(t);
        }
      });
      console.log('removed  in resend arrar message with ID =>' + messageID);
      this.snakeBar.close_bar();
      //console.log("removed length "+this.resendMessages.length)
    }
  }

  actionResendMessages() {
    this.snakeBar.start_bar('Please Wait');
    var filtered_smsMessages: HistoryDatum[] = [];
    var filtered_mmsMessages: HistoryDatum[] = [];
    this.resendMessages.forEach((e) => {
      var mType = e.message_type!.toLowerCase() as string;
      if (mType == 'sms') {
        filtered_smsMessages.push(e);
      } else {
        filtered_mmsMessages.push(e);
      }
    });
    if (filtered_smsMessages.length > 0) {
      filtered_smsMessages.forEach((e) => {
        const m: MyMessage = {
          body: e.body!,
          to: e.to!,
          from: e.from!,
        };
        const param: SendSMSParam = { messages: [m] };
        let json = localStorage.getItem('user_data');

        if (json != null) {
          this.data = JSON.parse(json);
          let username = this.data.username;
          let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
          var auths = EncodeDecode.b64EncodeUnicode(username + ':' + password);

          this.apiService.sendSMS(auths, param).subscribe((response) => {
            if (response.response_code == 'SUCCESS') {
              Toaster.sucessToast(response.response_msg!);
              this.snakeBar.close_bar();
            } else {
              Toaster.failureToast(
                response.response_code!,
                response.response_msg!
              );
              this.snakeBar.close_bar();
            }
          });
        }
      });
    }
    if (filtered_mmsMessages.length > 0) {
      filtered_mmsMessages.forEach((e) => {
        const mms_message: MMsMessage = {
          source: 'node.js',
          to: e.to!,
          from: e.from!,
          subject: e.subject!,
          body: e.body!,
        };
        const param: SendSMSParam = { messages: [mms_message] };
        let json = localStorage.getItem('user_data');

        if (json != null) {
          this.data = JSON.parse(json);
          let username = this.data.username;
          let password = EncodeDecode.b64DecodeUnicode(this.data.passcode);
          var auths = EncodeDecode.b64EncodeUnicode(username + ':' + password);
          this.apiService.sendMMS(auths, param).subscribe((response) => {
            if (response.response_code == 'SUCCESS') {
              Toaster.sucessToast(response.response_msg!);
              this.snakeBar.close_bar();
            } else {
              Toaster.failureToast(
                response.response_code!,
                response.response_msg!
              );
              this.snakeBar.close_bar();
            }
          });
        }
      });
    }
    if (this.resendMessages.length <= 0) {
      Toaster.failureToast('Failed', 'Please select a message to resend');
      this.snakeBar.close_bar();
    }
  }

  openExportDialog() {
    this.modalService
      .open(SimpledialogComponent, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'l',
      })
      .result.then(
        (result) => {
          console.log($(result));
        },
        (reason) => {
          console.log('reason is ' + reason);
          this.actionSMSHistoryExport(reason);
        }
      );
  }

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  //REMOTE MESSAGES
  onSubscribedDeviceChange(event: any) {
    this.snakeBar.start_bar('Please Wait');
    const subscribedDeviceID = <number>event.target.value;
    this.search_param_selected_subscribed_device_ID = subscribedDeviceID;
    if (this.search_param_selected_subscribed_device_ID != -1) {
      this.fetchSubscribedDevicesSim();
      this.userSearchedForRemoteMessages = 1;
    } else {
      this.userSearchedForRemoteMessages = 0;
    }
    this.snakeBar.close_bar();
  }

  simSelectionChangeHandler(event: any) {
    var selectedSim = <string>event.target.value;
    console.log('selected sim  is', selectedSim);
    if (selectedSim === '' || selectedSim === 'NONE') {
      selectedSim = '0';
    }
    this.userSelectDeviceSim = selectedSim;
  }

  getSubscribedDevices(userID: string) {
    this.apiService.getSubscribedDevices(userID).subscribe((response) => {
      let initialDevice: HTTPResponseSubscribedDevices = {
        country: '-1',
        device: 'NONE',
        id: -1,
        imei: '-1',
        imsi: '-1',
        phone: '-1',
        username: '-1',
      };
      var devicees = response.http_response as HTTPResponseSubscribedDevices[];
      devicees.push(initialDevice);
      this.subscribedDevices = devicees;
    });
  }

  fetchSubscribedDevicesSim() {
    this.apiService
      .getSubscribedDevicesSim(
        this.search_param_selected_subscribed_device_ID.toString()
      )
      .subscribe((response) => {
        let intialSim: HTTPResponseSubscribedDeviceSim = {
          number: 'NONE',
        };
        var fetchedSims =
          response.http_response as HTTPResponseSubscribedDeviceSim[];
        fetchedSims.push(intialSim);
        this.sims = fetchedSims;
      });
  }

  actionFetchSubscribedDeviceRemoteMessages() {
    let json = localStorage.getItem('user_data');

    if (json != null) {
      this.data = JSON.parse(json);
      let id = this.data.id;
      this.search_param_selected_subscribed_ID = id;
      this.search_param_selected_subscribed_device_ID = id;
      // this.search_param_selected_subscribed_device_ID = 270610;

      this.apiService
        .getSubscribedDevicesRemoteMessages(
          this.search_param_selected_subscribed_device_ID
        )
        .subscribe((e) => {
          this.sms_history_array = [];
          this.filtered_history_array = [];
          const msgs = e.http_response as SubscribedDevicesRemoteMessage[];
          msgs.forEach((item) => {
            const k: HistoryDatum = {
              message_id: item.id?.toString(),
              _api_username: item.username,
              first_name: item.username,
              carrier: item.device,
              body: item.body,
              from: item.from_num != '' ? item.from_num : 'N/A',
              to: item.to_num,
              direction: item.direction,
              message_price: item.cost,
              status: item.status,
              status_text: item.status,
              message_type: 'Remote SMS',
              date: DateHandler.convertDateToUnixTimestampWith(item.date!),
            };
            this.sms_history_array.push(k);
          });
          this.applyFilteringOnRemoteMessagesData();
          this.snakeBar.close_bar();
        });
    }
  }

  applyFilteringOnRemoteMessagesData() {
    if (this.sms_history_array.length > 0 && this.userSelectDeviceSim != '0') {
      this.filtered_history_array = this.sms_history_array.filter(
        (m: HistoryDatum) => m.from! === this.userSelectDeviceSim
      );
      if (this.filtered_history_array.length == 0) {
        this.search_param_page_length = 0;
      }
    } else {
      this.filtered_history_array = this.sms_history_array;
      if (this.filtered_history_array.length == 0) {
        this.search_param_page_length = 0;
      }
    }
  }

  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent) {
    var index = event.pageIndex + 1;
    this.search_param_page_index = index;
    this.actionFetchHistory(this.search_param_messageType);
    return event;
  }
}
