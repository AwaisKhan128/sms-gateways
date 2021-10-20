// To parse this data:
//
//   import { Convert, OperatorsResponse } from "./file";
//
//   const operatorsResponse = Convert.toOperatorsResponse(json);

export interface OperatorsResponse {
    http_code?:     number;
    http_response?: PhoneOperator[];
}

export interface PhoneOperator {
    id?:            number;
    operator_name?: string;
    operator_code?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toOperatorsResponse(json: string): OperatorsResponse {
        return JSON.parse(json);
    }

    public static operatorsResponseToJson(value: OperatorsResponse): string {
        return JSON.stringify(value);
    }
}
