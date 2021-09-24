import { Component, OnInit } from '@angular/core';
import { type } from 'os';
import { API_Services } from 'src/app/APIS/freeapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private freeapi :API_Services) {

   }

  ngOnInit(): void {
      this.freeapi.getClickSendStatistic(0).subscribe()
  }

}
