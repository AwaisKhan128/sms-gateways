// To parse this data:
//
//   import { Convert, SendMmsParam } from "./file";
//
//   const sendMmsParam = Convert.toSendMmsParam(json);

export interface SendMmsParam {
    messages?:   Message[];
    media_file?: string;
}

export interface Message {
    subject?:       string;
    from?:          string;
    to?:            string;
    source?:        string;
    body?:          string;
    custom_string?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSendMmsParam(json: string): SendMmsParam {
        return JSON.parse(json);
    }

    public static sendMmsParamToJson(value: SendMmsParam): string {
        return JSON.stringify(value);
    }
}
