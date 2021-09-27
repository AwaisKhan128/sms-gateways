import { Observable } from 'rxjs';
import { HttpClient,HttpHeaderResponse,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateAcc } from '../Classes/createAcc_';
import { send_Code } from '../Classes/Verify_acc';
import { API_BASE_URLS, CLICKSEND_API_ENDPOINTS, HTTP_HEADER_OPTIONS } from './APIConfig';
import { SendSMSParam } from '../Classes/SMS/send_sms_param';
import { SendSMSResponse } from '../Classes/SMS/send_sms_response';



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


    sendSMS(param: SendSMSParam):Observable<SendSMSResponse>
    {
        const url= API_BASE_URLS.CLICKSEND_BASE_URL + CLICKSEND_API_ENDPOINTS.SMS_SEND
        return this.httpClient.post(url, param, {headers:HTTP_HEADER_OPTIONS.CLICKSEND_HEADER})  
    }
 

}