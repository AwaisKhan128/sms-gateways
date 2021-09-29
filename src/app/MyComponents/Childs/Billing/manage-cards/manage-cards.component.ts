import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

  number:any;
  cvc:any;
  name:any;
  date:any;
  b_name:any;
  

  constructor() { }

  ngOnInit(): void {
  }
  public receive_card_details()
  {

  }

}
