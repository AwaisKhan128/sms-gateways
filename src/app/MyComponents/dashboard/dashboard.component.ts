import { Component, OnInit } from '@angular/core';
//import { log } from 'console';
// import { type } from 'os';
import { API_Services } from 'src/app/APIS/freeapi.service';
import { StatisticSMS } from 'src/app/Classes/StatisticSMS';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  s_sms: StatisticSMS | undefined;


  constructor(private freeapi :API_Services) {

   }

  ngOnInit(): void {
      this.freeapi.getClickSendStatistic(0)
        .subscribe(s_sms => this.s_sms = s_sms)
  }

}


// 