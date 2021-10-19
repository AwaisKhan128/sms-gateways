import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-send-ussd-inquiry',
  templateUrl: './send-ussd-inquiry.component.html',
  styleUrls: ['./send-ussd-inquiry.component.css']
})
export class SendUSSDInquiryComponent implements OnInit {

  areAllNumbersSelected = false
  numbers: databseNumberModel[] = [];

  constructor() { }

  ngOnInit(): void {
    
    const i1 : databseNumberModel = {
      port: "1",
      slot: "1",
      number: "03431111111",
      USSDRequest: "1",
      USSDStatus: "Not Send",
      isDisabled: true
    }

    const i2 : databseNumberModel = {
      port: "1",
      slot: "1",
      number: "03431111111",
      USSDRequest: "1",
      USSDStatus: "Not Send",
      isDisabled: true
    }

    const i3 : databseNumberModel = {
      port: "1",
      slot: "1",
      number: "03551234123",
      USSDRequest: "1",
      USSDStatus: "Not Send",
      isDisabled: true
    }
    
    const i4 : databseNumberModel = {
      port: "1",
      slot: "1",
      number: "03551354123",
      USSDRequest: "1",
      USSDStatus: "Not Send",
      isDisabled: true
    }

    this.numbers.push(i1)
    this.numbers.push(i2)
    this.numbers.push(i3)
    this.numbers.push(i4)

  }



  specificNumbersSelected(event: any) {
    const number = <string>event.target.value;
    if ($('#'+number).prop('checked')) {
        this.numbers.forEach(e=>{
          if(e.number! == number) {
            e.isDisabled = false
            console.log("founddd")
          }
        })
    }
    else {
      this.numbers.forEach(e=>{
        if(e.number! == number) {
          e.isDisabled = true
          console.log("founddd to disable")
        }
      })
    }
  }

  allNumbersSelected(event: any) {
    this.numbers.forEach(i=>{
      if ($('#'+i.number!).prop('checked')) {
        $('#'+i.number!).prop('checked', false)
        i.isDisabled! = true
      }
      else {
        $('#'+i.number!).prop('checked', true)
        i.isDisabled! = false
      }
    })
  }
  


}


export interface databseNumberModel {
  port?: string;
  slot?: string;
  number?: string;
  USSDRequest?: string;
  USSDStatus?: string;
  isDisabled? : boolean
}