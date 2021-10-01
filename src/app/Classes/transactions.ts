export class transaction_resp
{
    http_code: any;
    response_code: any;
    response_msg: any;
}
export class transaction_resp_data
{
    total: any
    per_page: any
    current_page: any
    last_page: any
    next_page_url: any;
    prev_page_url: any;
}
export class transaction_resp_data1
{
    invoice_number:any;
    amount:any
    currency:any
    date:any;
}

// ------------Manage Card details----------------

export class get_card_details{
    http_code: any;
    response_code: any;
    response_msg: any;
}
export class get_card_details1{
    display_number: any;
    expiry_month: any;
    expiry_year: any;
    name: any;
}

export class card_info
{
    number:any;
    expiry_month:any;
    cvc:any;
    name:any;
    bank_name:any;
    expiry_year:any;
}