// To parse this data:
//
//   import { Convert, SubscribedDevicesRemoteMessagesResponse } from "./file";
//
//   const subscribedDevicesRemoteMessagesResponse = Convert.toSubscribedDevicesRemoteMessagesResponse(json);

export interface SubscribedDevicesRemoteMessagesResponse {
    http_code?:                      number;
    SubscribedDevicesRemoteMessage?: SubscribedDevicesRemoteMessage[];
}

export interface SubscribedDevicesRemoteMessage {
    id?:        number;
    username?:  string;
    device?:    string;
    body?:      string;
    from_num?:  string;
    to_num?:    string;
    direction?: string;
    type?:      string;
    cost?:      string;
    status?:    string;
    date?:      string;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toSubscribedDevicesRemoteMessagesResponse(json: string): SubscribedDevicesRemoteMessagesResponse {
        return JSON.parse(json);
    }

    public static subscribedDevicesRemoteMessagesResponseToJson(value: SubscribedDevicesRemoteMessagesResponse): string {
        return JSON.stringify(value);
    }
}
