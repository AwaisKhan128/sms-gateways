import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Operator } from 'rxjs';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { PhoneOperator } from 'src/app/Classes/operatorResponse';

@Component({
  selector: 'app-send-ussd-inquiry',
  templateUrl: './send-ussd-inquiry.component.html',
  styleUrls: ['./send-ussd-inquiry.component.css']
})
export class SendUSSDInquiryComponent implements OnInit {

  areAllNumbersSelected = false
  operators: PhoneOperator[] = [];
  

  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
    this.getOperators()
  }



  specificNumbersSelected(event: any) {
    // const number = <string>event.target.value;
    // if ($('#'+number).prop('checked')) {
    //     this.numbers.forEach(e=>{
    //       if(e.number! == number) {
    //         e.isDisabled = false
    //         console.log("founddd")
    //       }
    //     })
    // }
    // else {
    //   this.numbers.forEach(e=>{
    //     if(e.number! == number) {
    //       e.isDisabled = true
    //       console.log("founddd to disable")
    //     }
    //   })
    // }
  }

  allNumbersSelected(event: any) {
    // this.numbers.forEach(i=>{
    //   if ($('#'+i.number!).prop('checked')) {
    //     $('#'+i.number!).prop('checked', false)
    //     i.isDisabled! = true
    //   }
    //   else {
    //     $('#'+i.number!).prop('checked', true)
    //     i.isDisabled! = false
    //   }
    // })
  }


  //apis
  getOperators() {
    this.apiService.getlistofOperators().subscribe(
      e=>{
        const ops = e.http_response as PhoneOperator[]
        let k : PhoneOperator = {
          id: -1,
          operator_name: "NONE",
          operator_code: "NONE"
        }
        ops.push(k)
        console.log("ops 0",ops[0])
        this.operators = ops
      }
    )
  }

}

