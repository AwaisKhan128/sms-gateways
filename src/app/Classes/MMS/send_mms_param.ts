// To parse this data:
//
//   import { Convert, SendMmsParam } from "./file";
//
//   const sendMmsParam = Convert.toSendMmsParam(json);

export interface SendMMSParam {
    messages?:   MMsMessage[];
    media_file?: string;
}

export interface MMsMessage {
    subject?:       string;
    from?:          string;
    to?:            string;
    source?:        string;
    body?:          string;
    custom_string?: string;
    schedule?:      number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSendMmsParam(json: string): SendMMSParam {
        return JSON.parse(json);
    }

    public static sendMmsParamToJson(value: SendMMSParam): string {
        return JSON.stringify(value);
    }
}
