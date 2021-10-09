// To parse this data:
//
//   import { Convert, ViewSMSTemplatesResponse } from "./file";
//
//   const viewSMSTemplatesResponse = Convert.toViewSMSTemplatesResponse(json);

export interface ViewSMSTemplatesResponse {
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
    next_page_url?: null;
    prev_page_url?: null;
    from?:          number;
    to?:            number;
    data?:          SMSTemplate[];
}

export interface SMSTemplate {
    template_id:   number;
    body:          string;
    template_name: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toViewSMSTemplatesResponse(json: string): ViewSMSTemplatesResponse {
        return JSON.parse(json);
    }

    public static viewSMSTemplatesResponseToJson(value: ViewSMSTemplatesResponse): string {
        return JSON.stringify(value);
    }
}
