// To parse this data:
//
//   import { Convert, SubscribedDevices } from "./file";
//
//   const subscribedDevices = Convert.toSubscribedDevices(json);

export interface SubscribedDevices {
    http_code?:     number;
    http_response?: HTTPResponseSubscribedDevices[];
}

export interface HTTPResponseSubscribedDevices {
    id?:       number;
    username?: string;
    imei?:     string;
    imsi?:     string;
    phone?:    string;
    device?:   string;
    country?:  string;
    date?:     Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSubscribedDevices(json: string): SubscribedDevices {
        return JSON.parse(json);
    }

    public static subscribedDevicesToJson(value: SubscribedDevices): string {
        return JSON.stringify(value);
    }
}
