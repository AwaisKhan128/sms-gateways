// To parse this data:
//
//   import { Convert, SMSHistoryExportResponse } from "./file";
//
//   const sMSHistoryExportResponse = Convert.toSMSHistoryExportResponse(json);

export interface SMSHistoryExportResponse {
    http_code?:     number;
    response_code?: string;
    response_msg?:  string;
    data?:          Data;
}

export interface Data {
    url?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSMSHistoryExportResponse(json: string): SMSHistoryExportResponse {
        return JSON.parse(json);
    }

    public static sMSHistoryExportResponseToJson(value: SMSHistoryExportResponse): string {
        return JSON.stringify(value);
    }
}
