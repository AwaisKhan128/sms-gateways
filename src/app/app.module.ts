import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ProfileRouting} from './MyComponents/profile/profile-routing.module'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './MyComponents/sign-in/sign-in.component';
import { CreateAccComponent } from './MyComponents/create-acc/create-acc.component';
import * as $ from "jquery";
import { environment } from "src/environments/environment";
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { PersonalComponent } from './MyComponents/personal/personal.component';
import { TemplatesComponent } from './MyComponents/templates/templates.component';
import { ContactsComponent } from './MyComponents/contacts/contacts.component';
import { MessagesComponent } from './MyComponents/messages/messages.component';
import { SenderComponent } from './MyComponents/sender/sender.component';
import {HttpClientModule} from '@angular/common/http';
import { API_Services } from './APIS/freeapi.service';
import { VerifyComponent } from './MyComponents/verify/verify.component';
import { toBase64String } from '@angular/compiler/src/output/source_map';






@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CreateAccComponent,
    ProfileComponent,
    DashboardComponent,
    PersonalComponent,
    TemplatesComponent,
    ContactsComponent,
    MessagesComponent,
    SenderComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ProfileRouting,
    HttpClientModule,
    
    
    
  ],
  providers: [
  API_Services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
