import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Operator } from 'rxjs';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { DevicesMatchingOperator } from 'src/app/Classes/devices_matching_operator';
import { PhoneOperator } from 'src/app/Classes/operatorResponse';
import { USSDMatchingOperators } from 'src/app/Classes/ussd_matching_operator';

@Component({
  selector: 'app-send-ussd-inquiry',
  templateUrl: './send-ussd-inquiry.component.html',
  styleUrls: ['./send-ussd-inquiry.component.css']
})
export class SendUSSDInquiryComponent implements OnInit {

  areAllNumbersSelected = false
  didSendSelectedDeviceMessage = false

  operators: PhoneOperator[] = [];
  phoneNumbers: DevicesMatchingOperator[] = [];
  ussds: USSDMatchingOperators[] = [];


  constructor(private apiService: API_Services) { }

  ngOnInit(): void {
    this.getOperators()
  }



  onOperatorCodeSelected(event: any) {
    const opCode = <number>event.target.value;
    console.log(opCode)
    if(opCode !== -1) {
      this.getListOfDevicesForOperator(opCode.toString())
      this.getListOfUSSD(opCode.toString())
    }
    else {
      this.phoneNumbers = [];
      this.ussds = [];
    }
  }

  specificNumbersSelected(event: any) {
    const number = <string>event.target.value;
    if ($('#'+number).prop('checked')) {
        this.phoneNumbers.forEach(e=>{
          if(e.number! == number) {
            e.isDisabled = false
            console.log("founddd")
          }
        })
    }
    else {
      this.phoneNumbers.forEach(e=>{
        if(e.number! == number) {
          e.isDisabled = true
          console.log("founddd to disable")
        }
      })
    }
  }

  allNumbersSelected(event: any) {
    this.phoneNumbers.forEach(i=>{
      if ($('#'+i.number!).prop('checked') && this.areAllNumbersSelected == false) {
        $('#'+i.number!).prop('checked', false)
        i.isDisabled! = true
      }
      else {
        $('#'+i.number!).prop('checked', true)
        i.isDisabled! = false
      }
    })
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

  getListOfDevicesForOperator(opcode: string) {
      var i = 0
      this.apiService.getlistofDevicesForOperator(opcode).subscribe(
        e=> {
          this.phoneNumbers = [];
          const d = e.http_response as DevicesMatchingOperator[]
          console.log(d)
          d.forEach(e=>{
            i+= 1
            e.number! += i
            e.isDisabled = true
            e.defaultUSSDReply = ""
            e.defaultUSSDStatus = "Not Send"
          })
          this.phoneNumbers = d
        }
      )
  }

  getListOfUSSD(opcode: string) {
      this.apiService.getListofUSSDsForOperator(opcode).subscribe(e=>{
          const my_ussds = e.http_response as USSDMatchingOperators[]
          this.ussds = my_ussds
      })
  }

}

