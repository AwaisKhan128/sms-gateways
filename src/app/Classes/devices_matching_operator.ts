// To parse this data:
//
//   import { Convert, DevicesMatchingOperatorResponse } from "./file";
//
//   const devicesMatchingOperatorResponse = Convert.toDevicesMatchingOperatorResponse(json);

export interface DevicesMatchingOperatorResponse {
    http_code?:     number;
    http_response?: DevicesMatchingOperator[];
}

export interface DevicesMatchingOperator {
    number?: string;
    defaultUSSDStatus: string;
    defaultUSSDReply: string;
    isDisabled: boolean
    ussdCodeToSend: string
    ussdSendToNumber?: string
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDevicesMatchingOperatorResponse(json: string): DevicesMatchingOperatorResponse {
        return JSON.parse(json);
    }

    public static devicesMatchingOperatorResponseToJson(value: DevicesMatchingOperatorResponse): string {
        return JSON.stringify(value);
    }
}
