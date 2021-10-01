import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { EncodeDecode } from 'src/app/Classes/EncodeDec64';
import { transaction_resp, transaction_resp_data, transaction_resp_data1 } from 'src/app/Classes/transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transaction_resp:transaction_resp|any;
  transaction_resp_data:transaction_resp_data|any;
  transaction_resp_data1:transaction_resp_data1[]|any;
  data:any;
  modalService: any;
  closeResult: string|any;


  constructor(private freeAPI:API_Services) { }

  ngOnInit(): void {
    let json = localStorage.getItem("user_data");
    if(json!=null)
    {
      this.data = JSON.parse(json);
      let username = this.data.username;
      let password = EncodeDecode.b64DecodeUnicode( this.data.passcode);
      var auths = EncodeDecode.b64EncodeUnicode(username+":"+password);

      this.freeAPI.getbilling_transaction(auths)
      .subscribe(
        res=>{
          let data = JSON.parse(JSON.stringify(res));
          this.transaction_resp = data;
          this.transaction_resp_data = data.data;
          this.transaction_resp_data1 = data.data.data;
        },
        err=>
        {
          alert(err);
          console.log(err);

        }
      )
    }
    
  }



}
