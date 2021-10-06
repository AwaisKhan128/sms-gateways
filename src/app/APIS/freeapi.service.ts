import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaderResponse,HttpHeaders,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateAcc } from '../Classes/createAcc_';
import { send_Code } from '../Classes/Verify_acc';
import { API_BASE_URLS, CLICKSEND_API_ENDPOINTS, HTTP_HEADER_OPTIONS } from './APIConfig';
import { SendSMSParam } from '../Classes/SMS/send_sms_param';
import { SendResponse } from '../Classes/SMS/send_sms_response';
import { SendMMSParam } from '../Classes/MMS/send_mms_param';
import { HistoryResponse } from '../Classes/SMS/sms_history_response';
import { ViewSMSTemplatesResponse } from '../Classes/SMS/view_sms_templates_response';
import { SMSHistoryExportResponse } from '../Classes/SMS/sms_history_export_response';
import { StatisticsSMSData } from '../Classes/Statistics/statistics_sms';



@Injectable()
export class API_Services{

    constructor(private httpClient:HttpClient)
    {

    }

    getCountriess():Observable<any>
    {
        return this.httpClient.get('https://rest.clicksend.com/v3/countries')
    }
    

    
    createAcc_post(header:any,body:CreateAcc):Observable<any>
    {
        const headers = { 'Content-Type': header };
        return this.httpClient.post('https://rest.clicksend.com/v3/account',body, { headers:headers })
    }

    getVerify(auth:string,code:any):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth };
        return this.httpClient.put('https://rest.clicksend.com/v3/account-verify/verify/'+code,{headers:headers})
    }

    send_Code(auth:string,body:send_Code):Observable<any>
    {
        const headers = {'Authorization':'Basic '+auth,'Content-Type':'application/json'};
        return this.httpClient.put('https://rest.clicksend.com/v3/account-verify/send',body,{headers:headers})
    }

    getLogin(auth:string):Observable<any>
    {
        const headers = { 'Authorization': 'Basic '+auth };
        return this.httpClient.get('https://rest.clicksend.com/v3/account',{headers:headers})

    }

    getLoginAuthDB(id:number,table:string):Observable<any>
    {
        const header = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.get('http://localhost:8000/select/'+id+'/'+table,{headers:header});
    }

    setUserDetailsDB(id:number,username:string,ip_addr:string,device:any,country:string,table:string)
    {
        const header = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.post('http://localhost:8000/insert/'+
        table+'?id='+id+'&username='+username+'&ip_addr='+ip_addr+'&device='+device+'&country='+country,{headers:header});
    }

    modifyUserDetailsDB(id:number,ip_addr:string,device:any,country:string,table:string)
    {
        const header = {'Access-Control-Allow-Origin':'*'};
        return this.httpClient.put('http://localhost:8000/modify/'+
        table+'?id='+id+'&ip_addr='+ip_addr+'&device='+device+'&country='+country,{headers:header});
    }

    Send_forget_notify(body:any)
    {
        const header = { 'Content-Type': 'application/json' };
        return this.httpClient.put('https://rest.clicksend.com/v3/forgot-username',body,{headers:header})
    }

    Send_forget_passcode(body:any)
    {
        const header = { 'Content-Type': 'application/json' };
        return this.httpClient.put('https://rest.clicksend.com/v3/forgot-password',body,{headers:header})
    }

    getbilling_transaction(auth:string)
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return  this.httpClient.get('https://rest.clicksend.com/v3/recharge/transactions',{headers:headers})
    }

    get_card_details(auth:string|any)
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get('https://rest.clicksend.com/v3/recharge/credit-card',{headers:headers})
    }

    create_sms_template(auth:string|any,body:any)
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.post('https://rest.clicksend.com/v3/sms/templates',body,{headers:headers})
    }

    get_sms_templates(auth:string|any)
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.get('https://rest.clicksend.com/v3/sms/templates',{headers:headers})
    }

    remove_sms_templates(auth:string|any,template_id:any)
    {
        const headers = { 'Authorization': 'Basic '+auth};
        return this.httpClient.delete('https://rest.clicksend.com/v3/sms/templates/'+template_id,{headers:headers})
    }





    sendSMS(param: SendSMSParam):Observable<SendResponse>
    {
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_SEND
        return this.httpClient.post(url, param, {headers:HTTP_HEADER_OPTIONS.CLICKSEND_HEADER});  
    }
 

    sendMMS(param: SendMMSParam):Observable<SendResponse>
    {
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.MMS_SEND
        return this.httpClient.post(url, param, {headers:HTTP_HEADER_OPTIONS.CLICKSEND_HEADER});  
    }

    getSMSHisory(date_from?: number | undefined, date_to?: number | undefined, current_page_index?: number | undefined, page_limit?: number | undefined):Observable<HistoryResponse>
    {
        var url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_HISTORY
        url+="?date_from="+date_from+"&date_to="+date_to+"&page="+current_page_index+"&limit="+page_limit
        return this.httpClient.get(url, {headers: HTTP_HEADER_OPTIONS.CLICKSEND_HEADER})
    }

    getMMSHistory(date_from?: number | undefined, date_to?: number | undefined):Observable<HistoryResponse> {
        var url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.MMS_HISTORY
        url +="?date_from="+date_from+"&date_to="+date_to
        return this.httpClient.get(url,{headers: HTTP_HEADER_OPTIONS.CLICKSEND_HEADER})
    }

    getSMSTemplates(): Observable<ViewSMSTemplatesResponse> {
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_Template
        return this.httpClient.get(url,{headers: HTTP_HEADER_OPTIONS.CLICKSEND_HEADER})
    }

    getExportSMSHistory(filename: string = ""): Observable<SMSHistoryExportResponse> {
        var url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_History_Export
        url+="?filename="+filename
        return this.httpClient.get(url,{headers: HTTP_HEADER_OPTIONS.CLICKSEND_HEADER})
    }

    getExportMMSHistory(): Observable<SMSHistoryExportResponse> {
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.MMS_History_Export
        return this.httpClient.get(url,{headers: HTTP_HEADER_OPTIONS.CLICKSEND_HEADER})
    }

    getFileMessageHistory(url:string): Observable<string> {
        return this.httpClient.get(url,{responseType: 'text'})
    }

    getStatisticsSMS(): Observable<StatisticsSMSData> {
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.STATISTICS_SMS
        return this.httpClient.get(url,{headers: HTTP_HEADER_OPTIONS.CLICKSEND_HEADER})
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