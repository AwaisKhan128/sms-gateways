// To parse this data:
//
//   import { Convert, SendSMSParam } from "./file";
//
//   const sendSMSParam = Convert.toSendSMSParam(json);

export interface SendSMSParam {
    messages?: MyMessage[];
}

export interface MyMessage {
    source?:        string;
    body?:          string;
    to?:            string;
    custom_string?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSendSMSParam(json: string): SendSMSParam {
        return JSON.parse(json);
    }

    public static sendSMSParamToJson(value: SendSMSParam): string {
        return JSON.stringify(value);
    }
}
