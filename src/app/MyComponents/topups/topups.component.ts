import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-topups',
  templateUrl: './topups.component.html',
  styleUrls: ['./topups.component.css']
})
export class TopupsComponent implements OnInit {
  showFiller = false;
  window: any["$"] = $;



  constructor() { }

  ngOnInit(): void {
  }

  Topup_Web()
  {
    $("#topup_web").addClass('active');
    $("#topup_mob").removeClass('active');
  }

  Topup_Mobile()
  {
    $("#topup_mob").addClass('active');
    $("#topup_web").removeClass('active');
  }

}
