import { Injectable } from "@angular/core";

@Injectable()
export class SharedService{
    userData:any;
    constructor(){
      this.userData= {};
    }
    setUserData(val: object){
      this.userData= val;
    }
    getUserData(){
      return this.userData;
    }
}