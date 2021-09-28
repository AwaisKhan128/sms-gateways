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
    MMS_SEND = "mms/send"
}

export enum CLICKSEND_STATISTICS_TYPE {
    sms = 0,
    mms = 1
}