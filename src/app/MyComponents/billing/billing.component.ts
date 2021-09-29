import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';



@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  window: any["$"] = $;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public billingcontact()
  {
    // this.router.navigate(['.../home']);
    $("#billingcontact").addClass('active');
    $("#transaction").removeClass('active');
    $("#manage_cards").removeClass('active');
    $("#usage").removeClass('active');

  }
  public transaction()
  {
    $("#transaction").addClass('active');
    $("#manage_cards").removeClass('active');
    $("#billingcontact").removeClass('active');
    $("#usage").removeClass('active');


  }
  public manage_cards()
  {
    $("#manage_cards").addClass('active');
    $("#transaction").removeClass('active');
    $("#billingcontact").removeClass('active');
    $("#usage").removeClass('active');
    
  }
  public usage()
  {
    $("#manage_cards").removeClass('active');
    $("#transaction").removeClass('active');
    $("#billingcontact").removeClass('active');
    $("#usage").addClass('active');
  }

}
