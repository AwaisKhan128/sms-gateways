import { Observable } from 'rxjs';
import { HttpClient,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateAcc } from '../Classes/createAcc_';
import { send_Code } from '../Classes/Verify_acc';




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







    
}