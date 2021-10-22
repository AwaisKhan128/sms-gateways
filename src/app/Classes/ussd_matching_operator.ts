// To parse this data:
//
//   import { Convert, USSDMatchingOperatorResponse } from "./file";
//
//   const uSSDMatchingOperatorResponse = Convert.toUSSDMatchingOperatorResponse(json);

export interface USSDMatchingOperatorResponse {
    http_code?:     number;
    http_response?: USSDMatchingOperators[];
}

export interface USSDMatchingOperators {
    sms_number?: string;
    sms?: string,
    ussd?:           string;
    receive_format?: string;
    max_inquiry?:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUSSDMatchingOperatorResponse(json: string): USSDMatchingOperatorResponse {
        return JSON.parse(json);
    }

    public static uSSDMatchingOperatorResponseToJson(value: USSDMatchingOperatorResponse): string {
        return JSON.stringify(value);
    }
}
