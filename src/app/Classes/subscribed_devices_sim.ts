// To parse this data:
//
//   import { Convert, SubscribedDevicesSim } from "./file";
//
//   const subscribedDevicesSim = Convert.toSubscribedDevicesSim(json);

export interface SubscribedDevicesSim {
    http_code?:     number;
    http_response?: HTTPResponseSubscribedDeviceSim[];
}

export interface HTTPResponseSubscribedDeviceSim {
    id?:           number;
    simId?:        string;
    sim?:          string;
    number?:       string;
    balance?:      string;
    date?:         string;
    time?:         string;
    sim_Status?:   string;
    success?:      string;
    delay?:        string;
    phone_Status?: string;
    top_up?:       string;
    android_ver?:  string;
    device?:       string;
    imei?:         string;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toSubscribedDevicesSim(json: string): SubscribedDevicesSim {
        return JSON.parse(json);
    }

    public static subscribedDevicesSimToJson(value: SubscribedDevicesSim): string {
        return JSON.stringify(value);
    }
}
