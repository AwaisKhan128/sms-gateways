// To parse this data:
//
//   import { Convert, BalanceMatchingOperatorResponse } from "./file";
//
//   const balanceMatchingOperatorResponse = Convert.toBalanceMatchingOperatorResponse(json);

export interface BalanceMatchingOperatorResponse {
    http_code?:     number;
    http_response?: BalanceMatchingOperator[];
}

export interface BalanceMatchingOperator {
    ussd?:           string;
    receive_format?: string;
    max_inquiry?:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBalanceMatchingOperatorResponse(json: string): BalanceMatchingOperatorResponse {
        return JSON.parse(json);
    }

    public static balanceMatchingOperatorResponseToJson(value: BalanceMatchingOperatorResponse): string {
        return JSON.stringify(value);
    }
}
