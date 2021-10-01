// To parse this data:
//
//   import { Convert, SMSHistoryResponse } from "./file";
//
//   const sMSHistoryResponse = Convert.toSMSHistoryResponse(json);

export interface HistoryResponse {
    http_code?:     number;
    response_code?: string;
    response_msg?:  string;
    data?:          Data;
}

export interface Data {
    total?:         number;
    per_page?:      number;
    current_page?:  number;
    last_page?:     number;
    next_page_url?: string;
    prev_page_url?: null;
    from?:          number;
    to?:            number;
    data?:          HistoryDatum[];
}

export interface HistoryDatum {
    direction?:     Direction;
    date?:          number;
    to?:            string;
    body?:          Body;
    status?:        Status;
    from?:          string;
    schedule?:      string;
    status_code?:   null;
    status_text?:   null;
    error_code?:    null;
    error_text?:    null;
    message_id?:    string;
    message_parts?: number;
    message_price?: string;
    from_email?:    null;
    list_id?:       null;
    custom_string?: CustomString;
    contact_id?:    null;
    user_id?:       number;
    subaccount_id?: number;
    country?:       string;
    carrier?:       string;
    first_name?:    null;
    last_name?:     null;
    _api_username?: APIUsername;
    date_added?:      number;
    _media_file_url?: string;
    subject?:         string;
    priority?:        number;
    message_type?:    string;
}

export enum APIUsername {
    Gadig54496TinilaloCOM = "gadig54496@tinilalo.com",
}

export enum Body {
    HelloThere = "Hello there",
}

export enum CustomString {
    ThisIsATest = "this is a test",
}

export enum Direction {
    Out = "out",
}

export enum Status {
    Completed = "Completed",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSMSHistoryResponse(json: string): HistoryResponse {
        return JSON.parse(json);
    }

    public static sMSHistoryResponseToJson(value: HistoryResponse): string {
        return JSON.stringify(value);
    }
}
