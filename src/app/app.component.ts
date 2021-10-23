import { Observable } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SMS-Gateway';

  @ViewChild(MatSidenav) sidenav !: MatSidenav

  constructor(private observable: BreakpointObserver)
  {

  }


}
