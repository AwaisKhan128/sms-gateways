// To parse this data:
//
//   import { Convert, StatisticsSMS } from "./file";
//
//   const statisticsSMS = Convert.toStatisticsSMS(json);

export interface StatisticsSMS {
    http_code?:     number;
    response_code?: string;
    response_msg?:  string;
    data?:          StatisticsSMSData;
}

export interface StatisticsSMSData {
    total?:     Total;
    stats?:     Stat[];
    _currency?: Currency;
}

export interface Currency {
    currency_name_short?: string;
    currency_prefix_d?:   string;
    currency_prefix_c?:   string;
    currency_name_long?:  string;
    min_recharge_amount?: string;
    max_recharge_amount?: string;
}

export interface Stat {
    date?:     number;
    outbound?: Bound;
    inbound?:  Bound;
    bounced?:  Bounced;
}

export interface Bounced {
    count?: number;
}

export interface Bound {
    count?: number;
    price?: number;
}

export interface Total {
    outbound?: Bound;
    inbound?:  Bounced;
    bounced?:  Bounced;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStatisticsSMS(json: string): StatisticsSMS {
        return JSON.parse(json);
    }

    public static statisticsSMSToJson(value: StatisticsSMS): string {
        return JSON.stringify(value);
    }
}
