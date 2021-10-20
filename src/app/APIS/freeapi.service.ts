
import { Observable, of, Operator } from 'rxjs';
import { HttpClient,HttpHeaderResponse,HttpHeaders,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateAcc } from '../Classes/createAcc_';
import { send_Code } from '../Classes/Verify_acc';
import { API_BASE_URLS, CLICKSEND_API_ENDPOINTS, HEROKU_API_ENDPOINTS } from './APIConfig';
import { SendSMSParam } from '../Classes/SMS/send_sms_param';
import { SendResponse } from '../Classes/SMS/send_sms_response';
import { SendMMSParam } from '../Classes/MMS/send_mms_param';
import { HistoryResponse } from '../Classes/SMS/sms_history_response';
import { ViewSMSTemplatesResponse } from '../Classes/SMS/view_sms_templates_response';

import { ICreate_Contact } from '../Classes/manage_contacts';
import { SMSHistoryExportResponse } from '../Classes/SMS/sms_history_export_response';
import { StatisticsSMSData } from '../Classes/Statistics/statistics_sms';
import { SubscribedDevices } from '../Classes/subscribed_devices';
import { SubscribedDevicesRemoteMessagesResponse } from '../Classes/subscribed_devices_remote_messages';
import { SubscribedDevicesSim } from '../Classes/subscribed_devices_sim';
import { OperatorsResponse } from '../Classes/operatorResponse';



@Injectable()
export class API_Services{

    constructor(private httpClient:HttpClient)
    {

    }

    getCountriess():Observable<any>
    {
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'countries')
    }
    

    // Creating SubAccounts
    
    createAcc_post(auth:any,body:CreateAcc):Observable<any> //Change to Sub Account Creating
    {
        const headers = {'Authorization': 'Basic '+auth , 'Content-Type': 'application/json' };
        return this.httpClient.post(API_BASE_URLS.CLICKSEND_BASE_URL+'subaccounts',body, { headers:headers })
    }

    get_Sub_Acc(auth:string):Observable<any>
    {
        const headers = {'Authorization': 'Basic '+auth };
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'subaccounts',{headers:headers})
    }

    get_Sub_Acc_byID(auth:string,sub_id:any):Observable<any>
    {
        const headers = {'Authorization': 'Basic '+auth };
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'subaccounts/'+sub_id,{headers:headers})
    }

    update_Sub_Acc(auth:string,body:any, subAcc_id:any|number):Observable<any>
    {
        const headers = {'Authorization': 'Basic '+auth, "Content-Type": "application/json" };
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'subaccounts/'+subAcc_id,body,{headers:headers})
    }

    send_email_credential_admin(email:string|any,user:any,API:any):Observable<any>
    {
        const header = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.post(API_BASE_URLS._Credential_Base+'gatewaysendmail/'+email+'/'+user+'/'+API,{headers:header});
    }

    delete_subAcc(auth:string, subAcc_Id:number|any):Observable<any>
    {
        const headers = {'Authorization': 'Basic '+auth };
        return this.httpClient.delete(API_BASE_URLS.CLICKSEND_BASE_URL+'subaccounts/'+subAcc_Id,{headers:headers});
    }

    push_Acc_permissions(user_type:any,body:any):Observable<any>
    {
        const headers = {'Access-Control-Allow-Origin':'*', "Content-Type": "application/json" };
        return this.httpClient.post(API_BASE_URLS._Credential_Base+'insert/permissions/'+user_type,body,{headers:headers});
    }

    inject_Acc_permissions(subAcc_id:any,body:any):Observable<any>
    {
        const headers = {'Access-Control-Allow-Origin':'*', "Content-Type": "application/json" };
        return this.httpClient.put(API_BASE_URLS._Credential_Base+'modify/permissions?id='+subAcc_id,body,{headers:headers});
    }

    retrieve_Acc_permissions(id:any|number):Observable<any>
    {
        const headers = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.get(API_BASE_URLS._Credential_Base+'select/permissions?id='+id,{headers:headers})
    }

    retrieve_Acc_permissionsALL(status:any|number):Observable<any>
    {
        // const headers = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.get(API_BASE_URLS._Credential_Base+'select/permissions?status='+status)
    }


    // ------------Subscribe devices-----------------
    get_subscribe_devices(id:any|number):Observable<any>
    {
        const headers = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.get(API_BASE_URLS._Credential_Base+'subscribe/subscribe_devices?id='+id,{headers:headers})
    }

    get_subscribe_devices_details(id:any|number):Observable<any>
    {
        const headers = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.get(API_BASE_URLS._Credential_Base+'subscribe/sim/subscribe_devices_info?id='+id,{headers:headers})
    }



// ---------------->Resellers-------------->

    create_reseller(body:any):Observable<any>
    {
        const headers = {"Content-Type": "application/json" };
        return this.httpClient.post(API_BASE_URLS.CLICKSEND_BASE_URL+'account',body,{headers:headers});
    }



    getVerify(auth:string,code:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth };
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'account-verify/verify/'+code,{headers:headers})
    }

    send_Code(auth:string,body:send_Code):Observable<any>
    {
        const headers = {'Authorization':'Basic '+auth,'Content-Type':'application/json'};
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'account-verify/send',body,{headers:headers})
    }

    getLogin(auth:string):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth };
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'account',{headers:headers})

    }

    getLoginAuthDB(id:number,table:string):Observable<any>
    {
        const header = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.get(API_BASE_URLS._Credential_Base+'select/'+id+'/'+table,{headers:header});
    }

    setUserDetailsDB(id:number,username:string,ip_addr:any,device:any,country:string,table:string):Observable<any>
    {
        const header = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.post(API_BASE_URLS._Credential_Base+'insert/'+
        table+'?id='+id+'&username='+username+'&ip_addr='+ip_addr+'&device='+device+'&country='+country,{headers:header});
    }

    modifyUserDetailsDB(id:number,ip_addr:string,device:any,country:string,table:string):Observable<any>
    {
        const header = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.put(API_BASE_URLS._Credential_Base+'modify/'+
        table+'?id='+id+'&ip_addr='+ip_addr+'&device='+device+'&country='+country,{headers:header});
    }

    Send_forget_notify(body:any):Observable<any>
    {
        const header = { 'Content-Type': 'application/json' };
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'forgot-username',body,{headers:header})
    }

    Send_forget_passcode(body:any):Observable<any>
    {
        const header = { 'Content-Type': 'application/json' };
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'forgot-password',body,{headers:header})
    }

    getbilling_transaction(auth:string):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return  this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'recharge/transactions',{headers:headers})
    }



    get_card_details(auth:string|any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'recharge/credit-card',{headers:headers})
    }




    create_sms_template(auth:string|any,body:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.post(API_BASE_URLS.CLICKSEND_BASE_URL+'sms/templates',body,{headers:headers})
    }

    update_sms_tempalte(auth:string , body:any ,template_id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth , 'Content-Type':'application/json'};
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'sms/templates/'+template_id,body,{headers:headers})
    }

    get_sms_templates(auth:string|any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'sms/templates',{headers:headers})
    }

    get_sms_templates_by_Num(auth:string|any,page:any,limit:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'sms/templates?page='+page+'&limit='+limit,{headers:headers})
    }

    remove_sms_templates(auth:string|any,template_id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.delete(API_BASE_URLS.CLICKSEND_BASE_URL+'sms/templates/'+template_id,{headers:headers})
    }



    update_payment_info(auth:string|any, body:any ):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth , 'Content-Type':'application/json'};
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'recharge/credit-card',body,{headers:headers})
    }

    get_packages_list(auth:string|any, country:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'recharge/packages?country='+country,{headers:headers})
    }

    recharge_package(auth:string,id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'recharge/purchase/'+id,{headers:headers})
    }
    get_recharged_history(auth:string,page:any=undefined):Observable<any>
    {

        if(page!=null||undefined||'')
        {
            const headers = { 'Authorization': 'Basic '+auth};
            return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'recharge/transactions?page='+page,{headers:headers})

        }
        else{

            const headers = { 'Authorization': 'Basic '+auth};
            return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'recharge/transactions',{headers:headers})
        }

    }

    //Receive contact list

    create_contact_list(auth:string|any,body:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.post(API_BASE_URLS.CLICKSEND_BASE_URL+'lists',body,{headers:headers})
    }

    get_contact_list(auth:string|any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'lists',{headers:headers})

    }

    get_contact_list_byNum(auth:string|any,page:any,limit:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'lists?page='+page+'&limit='+limit,{headers:headers})
    }


    get_spec_contact_list(auth:string|any,list_id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'+list_id,{headers:headers})

    }

    update_contact_list(auth:string|any, body:any,list_id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'+list_id,body,{headers:headers})
    }

    delete_contact_list(auth:string, id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.delete(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'+id,{headers:headers})
    }


    // ----------Receive Contacts----------------

    get_Contacts(auth:string, id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'+id+'/contacts',{headers:headers})
    }

    get_Contacts_by_Num(auth:string, id:any,page:any,limit:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'+id+'/contacts?page='+page+'&limit='+limit,{headers:headers})
    }

    create_contact(auth:string,body:any,list_id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth,
         'Content-Type': 'application/json'};
        return this.httpClient.post(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'+list_id+'/contacts',body,{headers:headers});
    }


    update_contact(auth:string,body:any,list_id:any,contact_id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth,
         'Content-Type': 'application/json'};
        return this.httpClient.put(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'+list_id+'/contacts/'+contact_id,body,{headers:headers});
    }

    delete_contact(auth:string,list_id:any, contact_id:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth,
         'Content-Type': 'application/json'};
        return this.httpClient.delete(API_BASE_URLS.CLICKSEND_BASE_URL+'lists/'
        +list_id+'/contacts/'+contact_id,{headers:headers});
    }


    // --------------Check Users Available----------------
    search_user(type:any,id:any):Observable<any>
    {
        return this.httpClient.get(API_BASE_URLS._Credential_Base+'select/'+type+"?id="+id);
    }

    search_permissions(id:any):Observable<any>
    {
        return this.httpClient.get(API_BASE_URLS._Credential_Base+'select/permissions?id='+id);
    }

    // Verification Code Send..
    sendVerificationcodebyemail(email:any,code:any):Observable<any>
    {
        const headers = {"Content-Type": "application/json" };
        return this.httpClient.post(API_BASE_URLS._Credential_Base+'sendverification/'+email+'/'+code,{headers:headers})
    }



    sendSMS(auth:string,param: SendSMSParam):Observable<SendResponse>
    {
        const header = { 'Authorization':'Basic '+auth};
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_SEND
        return this.httpClient.post(url, param, {headers:header});  
    }
 

    sendMMS(auth:string,param: SendMMSParam):Observable<SendResponse>
    {
        const header = { 'Authorization':'Basic '+auth};
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.MMS_SEND
        return this.httpClient.post(url, param, {headers:header});  
    }

    getSMSHisory(auth:string ,date_from?: number | undefined, date_to?: number | undefined, current_page_index?: number | undefined, page_limit?: number | undefined):Observable<HistoryResponse>
    {
        const header = { 'Authorization':'Basic '+auth};
        var url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_HISTORY
        url+="?date_from="+date_from+"&date_to="+date_to+"&page="+current_page_index+"&limit="+page_limit
        return this.httpClient.get(url, {headers:header})
    }

    getMMSHistory(auth:string, date_from?: number | undefined, date_to?: number | undefined, current_page_index?: number | undefined, page_limit?: number | undefined):Observable<HistoryResponse> 
    {
        const header = { 'Authorization':'Basic '+auth};

        var url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.MMS_HISTORY
        url +="?date_from="+date_from+"&date_to="+date_to+"&page="+current_page_index+"&limit="+page_limit
        return this.httpClient.get(url,{headers: header})
    }

    getSMSTemplates(auth:string): Observable<ViewSMSTemplatesResponse> {
        const header = { 'Authorization':'Basic '+auth};
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_Template
        return this.httpClient.get(url,{headers: header})
    }

    getExportSMSHistory(auth:string, filename: string = ""): Observable<SMSHistoryExportResponse> {
        const header = { 'Authorization':'Basic '+auth};

        var url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_History_Export
        url+="?filename="+filename
        return this.httpClient.get(url,{headers: header})
    }


    getExportMMSHistory(auth:string): Observable<SMSHistoryExportResponse> {
        const header = { 'Authorization':'Basic '+auth};

        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.MMS_History_Export
        return this.httpClient.get(url,{headers: header})
    }

    getFileMessageHistory(url:string): Observable<string> {
        return this.httpClient.get(url,{responseType: 'text'})
    }

    getStatisticsSMS(encoded:string): Observable<StatisticsSMSData> {
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.STATISTICS_SMS
        const headers = {'Authorization':'Basic '+encoded};
        return this.httpClient.get(url,{headers: headers})
    }


    getSubscribedDevices(userID: string): Observable<SubscribedDevices> {
        const url = API_BASE_URLS._Credential_Base + HEROKU_API_ENDPOINTS.GET_SUBSCRIBE_DEVICES + "?id=" + userID
        return this.httpClient.get(url)
    }

    getSubscribedDevicesSim(userID: string): Observable<SubscribedDevices> {
        const url = API_BASE_URLS._Credential_Base + HEROKU_API_ENDPOINTS.GET_SUBSCRIBE_DEVICES_SIM + "?id=" + userID
        return this.httpClient.get(url)
    }

    getSubscribedDevicesRemoteMessages(userID: number): Observable<SubscribedDevicesRemoteMessagesResponse> {
        const url = API_BASE_URLS._Credential_Base + HEROKU_API_ENDPOINTS.GET_SUBSCRIBE_DEVICES_REMOTE_MESSAGES + "?id=" + userID
        return this.httpClient.get(url)
    }

    // ----------------------Operators-------------------

    getlistofOperators(): Observable<OperatorsResponse>
    {
        const url = API_BASE_URLS._Credential_Base+ HEROKU_API_ENDPOINTS.GET_OPERATORS;
        return this.httpClient.get(url);
    }

    create_operator(body:any) : Observable<any> // Name and code
    {
        const url = API_BASE_URLS._Credential_Base+'insert/operators/operators_list';
        return this.httpClient.post(url,body);
    }

    update_operator(body:any,id:any): Observable<any>
    {
        const url = API_BASE_URLS._Credential_Base+'modify/operators/operator_list?id='+id;
        return this.httpClient.put(url,body);
    }




    

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
   
  }


  

}