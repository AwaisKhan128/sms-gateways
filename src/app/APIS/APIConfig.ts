import { HttpHeaders } from "@angular/common/http";


export const HTTP_HEADER_OPTIONS = {
    CLICKSEND_HEADER: new HttpHeaders(
        { 'Authorization-Type': 'Basic Z2FkaWc1NDQ5NkB0aW5pbGFsby5jb206RDkyRENERkYtNUI4Ny00QzE0LTA2MUUtMTkyRTUxREM1REUy',
            "Content-Type": "application/json"}
        ),
}


export enum API_BASE_URLS {
    CLICKSEND_BASE_URL = "https://rest.clicksend.com/v3/"
}

export enum CLICKSEND_API_ENDPOINTS {
    STATISTICS_SMS = "statistics/sms",
    STATISTICS_MMS = "statistics/mms",
    SMS_SEND = "sms/send"
}

export enum CLICKSEND_STATISTICS_TYPE {
    sms = 0,
    mms = 1
}