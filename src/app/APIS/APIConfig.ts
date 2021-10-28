import { HttpHeaders } from "@angular/common/http";
import { EncodeDecode } from "../Classes/EncodeDec64";


// var username = "awais.khan128@yahoo.com";
// var password = "Myyahooacc#1";
// var encoded = EncodeDecode.b64EncodeUnicode(username+':'+password);

// export const HTTP_HEADER_OPTIONS = {
//     CLICKSEND_HEADER: new HttpHeaders(
//         { 
//             'Authorization':'Basic '+encoded,
//             'Content-Type': 'application/json'
//         }
//     ),
// }


export enum API_BASE_URLS {
    CLICKSEND_BASE_URL = "https://rest.clicksend.com/v3/",
    _Credential_Base = 'https://nodebacksql.herokuapp.com/',
    Net2Recharge = 'http://amin.net2recharge.com/sdk/'
    // ,
    // _Credential_Base_test = 'http://localhost:3000/'
}

export enum CLICKSEND_API_ENDPOINTS {
    STATISTICS_SMS = "statistics/sms",
    SMS_SEND = "sms/send",
    MMS_SEND = "mms/send",
    SMS_HISTORY = "sms/history",
    MMS_HISTORY = "mms/history",
    SMS_Template = "sms/templates",
    SMS_History_Export = "sms/history/export",
    MMS_History_Export = "mms/history/export",
}

export enum HEROKU_API_ENDPOINTS {
    GET_SUBSCRIBE_DEVICES = "subscribe/subscribe_devices",
    GET_SUBSCRIBE_DEVICES_SIM = "subscribe/sim/subscribe_devices_info",
    GET_SUBSCRIBE_DEVICES_REMOTE_MESSAGES = "message/remote_messages",
    GET_OPERATORS = "select/operators/operators_list",
    GET_OPERATORS_MATCHING_DEVICES = "operators/sim/subscribe_devices_info",
    GET_OPERATORS_MATCHING_USSD = "nselect/ussd/operator_number",
    GET_OPERATORS_MATCHING_BALANCE_NUMBERS = "bselect/ussd/operator_balance",
    GET_OPERATORS_MATCHING_SMS_FOR_MESSAGE = "nselect/sms/operator_number",
    GET_OPERATORS_MATCHING_SMS_FOR_CALL = "bselect/sms/operator_balance",
    UPDATE_DEVICE_INFO_NUMBER_SLOT = "subscribe/sim/subscribe_devices_info"
}

export enum CLICKSEND_STATISTICS_TYPE {
    sms = 0,
    mms = 1,
    all = 2
}

export interface isChecked
{
    ischeck:boolean;
}



export enum MESSAGE_STATUS_TYPE {
    sent ="sent",
    completed = "completed",
    all = "all"
}

export enum Net2Recharge
{
    user = 'abcd',
    api_key = '7lbzffSJ2CyYdN0AmxPw'

}