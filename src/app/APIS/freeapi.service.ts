import { Observable } from 'rxjs';
import { HttpClient,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateAcc } from '../Classes/createAcc_';
import { API_BASE_URLS, CLICKSEND_API_ENDPOINTS, CLICKSEND_STATISTICS_TYPE } from './CLICKSENDApiEndPoints';



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

        const headers = { 'Authorization-Type': 'Basic '+auth };
        return this.httpClient.put('https://rest.clicksend.com/v3/account-verify/verify/'+code,{headers:headers})
    }
    

    getClickSendStatistic(auth: String, type: CLICKSEND_STATISTICS_TYPE):Observable<any>
    {
        let stat_type = ""
        if (type == 0) {
            stat_type = CLICKSEND_API_ENDPOINTS.STATISTICS_SMS
        }
        else {
            stat_type = CLICKSEND_API_ENDPOINTS.STATISTICS_MMS
        }
        const headers = { 'Authorization-Type': 'Basic '+auth };
        const FULL_URL = API_BASE_URLS.CLICKSEND_BASE_URL+stat_type
        return this.httpClient.get(FULL_URL,{headers:headers})
    }
}