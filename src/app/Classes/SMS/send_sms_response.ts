
export interface SendResponse {
    http_code?:     number;
    response_code?: string;
    response_msg?:  string;
    data?:          Data;
}

export interface Data {
    total_price?:  number;
    total_count?:  number;
    queued_count?: number;
    messages?:     Message[];
    _currency?:    Currency;
}

export interface Currency {
    currency_name_short?: string;
    currency_prefix_d?:   string;
    currency_prefix_c?:   string;
    currency_name_long?:  string;
}

export interface Message {
    list_id?:         null;
    contact_id?:      number;
    subject?:         string;
    country?:         string;
    message_parts?:   number;
    message_price?:   string;
    _media_file_url?: string;
    to?:            string;
    body?:          string;
    from?:          string;
    schedule?:      string;
    message_id?:    string;
    custom_string?: string;
    status?:        string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSendResponse(json: string): SendResponse {
        return JSON.parse(json);
    }

    public static sendResponseToJson(value: SendResponse): string {
        return JSON.stringify(value);
    }
}
