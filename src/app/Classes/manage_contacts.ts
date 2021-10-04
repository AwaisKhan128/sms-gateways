
export class Create_Contact_List
{
    http_code: any;
    response_code: any;
    response_msg: any;

}

export class get_contact_list
{
    http_code: any;
    response_code:any;
    response_msg: any;
}

export class get_contact_list1
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

export class get_contact_list2
{
    list_id: any;
    list_name: any;
    list_email_id: any;
    _contacts_count: any;
}

export class get_contact_list_template
{
    list_id: any;
    list_name: any;
    list_email_id: any;
    _contacts_count: any;
    active:any|boolean=false;
}



export class get_contacts1{

    http_code: any;
    response_code:any;
    response_msg: any;
}
export class get_contacts2{

    total: any;
    per_page: any;
    current_page: any;
    last_page: any;
    next_page_url: any;
    prev_page_url: any;
    from: any;
    to: any;
}

export class get_contacts3_data
{
    contact_id: any;
    list_id: any;
    phone_number: any;
    first_name: any;
    last_name: any;
    custom_1:any;
    custom_2: any;
    custom_3: any;
    custom_4: any;
    date_added: any;
    date_updated: any;
    fax_number: any;
    organization_name: any;
    email: any;
    address_line_1: any;
    address_line_2: any;
    address_city: any;
    address_state: any;
    address_postal_code: any;
    address_country: any;
    _list_name: any;
}


export class Create_Contact
{
    first_name:any;
    last_name:any;
    organization_name:any;
    phone_number:any;
    email:any;
    custom_1:any;
    custom_2:any;
    custom_3:any;
    custom_4:any;
    address_line_1:any;
    address_line_2:any;
    address_city:any;
    address_state:any;
    address_country:any;
    address_postal_code:any;
    fax_number:any;
}

export class Update_Contact
{
    first_name:any;
    last_name:any;
    organization_name:any;
    phone_number:any;
    email:any;
    custom_1:any;
    custom_2:any;
    custom_3:any;
    custom_4:any;
    address_line_1:any;
    address_line_2:any;
    address_city:any;
    address_state:any;
    address_country:any;
    address_postal_code:any;
    fax_number:any;
}

export class Update_Contact_sample
{
    contact_id : any|number=0;
    active : any|boolean=false;
}







export interface ICreate_Contact
{
    c_first_name:any;
    c_last_name:any;
    c_org_name:any;
    c_phone_num:any;
    c_email:any;
    c_custom1:any;
    c_custom2:any;
    c_custom3:any;
    c_custom4:any;
    c_address1:any;
    c_address2:any;
    c_city:any;
    c_state:any;
    c_country:any;
    c_post_code:any;
    c_fax:any;
}