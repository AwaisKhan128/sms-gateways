import { HttpHeaders } from "@angular/common/http";
import { EncodeDecode } from "../Classes/EncodeDec64";

var username = 'gadig54496@tinilalo.com'
var password = 'D92DCDFF-5B87-4C14-061E-192E51DC5DE2'
var encoded = EncodeDecode.b64EncodeUnicode(username+':'+password);

export const HTTP_HEADER_OPTIONS = {
    CLICKSEND_HEADER: new HttpHeaders(
        { 
            'Authorization':'Basic '+encoded,
            'Content-Type': 'application/json'
        }
    ),
}


export enum API_BASE_URLS {
    CLICKSEND_BASE_URL = "https://rest.clicksend.com/v3/"
}

export enum CLICKSEND_API_ENDPOINTS {
    STATISTICS_SMS = "statistics/sms",
    STATISTICS_MMS = "statistics/mms",
    SMS_SEND = "sms/send",
    MMS_SEND = "mms/send",
    SMS_HISTORY = "sms/history",
    MMS_HISTORY = "mms/history",
    SMS_Template = "sms/templates",
    SMS_History_Export = "sms/history/export"
}

export enum CLICKSEND_STATISTICS_TYPE {
    sms = 0,
    mms = 1,
    all = 2
}

export enum MESSAGE_STATUS_TYPE {
    sent ="sent",
    completed = "completed",
    all = "all"
}