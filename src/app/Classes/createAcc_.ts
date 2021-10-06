export class CreateAcc
{
    api_username:any='';
    first_name:any='';
    last_name:any='';
    email:any='';
    phone_number:any='';
    password:any='';

}


export class get_SubAcc_details
{
    http_code: any;
    response_code: any;
    response_msg: any;
}

export class get_SubAcc_details1
{
    total: any;
    per_page: any;
    current_page: any;
    last_page: any;
    next_page_url: any;
    prev_page_url: any;
    from: any;
    to: any;
}

export class get_SubAcc_details2
{
    subaccount_id: any;
    api_username: any;
    email: any;
    phone_number: any;
    first_name: any;
    last_name: any;
    api_key: any;
    access_users: any;
    access_billing: any;
    access_reporting: any;
    access_contacts: any;
    access_settings: any;
    access_sms: any;
    access_email: any;
    access_voice: any;
    access_fax: any;
    access_post: any;
    access_reseller: any;
    access_mms: any;
    share_campaigns:any;
    notes: any;
}


export class Update_Admin_Result
{
    http_code: any;
    response_code: any;
    response_msg: any;
}

export class Update_Admin_Sample
{
    subaccount_id: any|number;
    api_username: any;
    email: any;
    phone_number: any;
    first_name: any;
    last_name: any;
    api_key: any;
    access_users: any;
    access_billing: any;
    access_reporting: any;
    access_contacts: any;
    access_settings: any;
    access_sms: any;
    access_email: any;
    access_voice: any;
    access_fax: any;
    access_post: any;
    access_reseller: any;
    access_mms: any;
    share_campaigns:any;
    notes: any;
    active: any|boolean=false;

}