// To parse this data:
//
//   import { Convert, SendSMSResponse } from "./file";
//
//   const sendSMSResponse = Convert.toSendSMSResponse(json);

export interface SendSMSResponse {
    http_code?:     number;
    response_code?: string;
    response_msg?:  string;
    data?:          Data;
}

export interface Data {
    total_price?:  number;
    total_count?:  number;
    queued_count?: number;
    messages?:     Message[];
    _currency?:    Currency;
}

export interface Currency {
    currency_name_short?: string;
    currency_prefix_d?:   string;
    currency_prefix_c?:   string;
    currency_name_long?:  string;
}

export interface Message {
    to?:            string;
    body?:          string;
    from?:          string;
    schedule?:      string;
    message_id?:    string;
    custom_string?: string;
    status?:        string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSendSMSResponse(json: string): SendSMSResponse {
        return JSON.parse(json);
    }

    public static sendSMSResponseToJson(value: SendSMSResponse): string {
        return JSON.stringify(value);
    }
}
