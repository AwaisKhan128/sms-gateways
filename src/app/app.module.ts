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
import { TopupsComponent } from './MyComponents/topups/topups.component';
import { BillingComponent } from './MyComponents/billing/billing.component';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { ResellersComponent } from './MyComponents/resellers/resellers.component';
import { SharedService } from './Classes/shared_services';
import { BillingContactComponent } from './MyComponents/Childs/Billing/billing-contact/billing-contact.component';
import { TransactionsComponent } from './MyComponents/Childs/Billing/transactions/transactions.component';
import { ManageCardsComponent } from './MyComponents/Childs/Billing/manage-cards/manage-cards.component';
import { UsageComponent } from './MyComponents/Childs/Billing/usage/usage.component';
import { OverlayModule } from "@angular/cdk/overlay";
import {MatDialogModule} from '@angular/material/dialog';





// Import from library
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
  DialogLayoutDisplay,
  ButtonLayoutDisplay,
  ButtonMaker,
} from '@costlydeveloper/ngx-awesome-popup';

import{
  MatDialog,MatDialogConfig

}from '@angular/material/dialog';
import { SampleComponent } from './MyComponents/sample/sample.component'






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
    VerifyComponent,
    TopupsComponent,
    BillingComponent,
    AdminComponent,
    ResellersComponent,
    BillingContactComponent,
    TransactionsComponent,
    ManageCardsComponent,
    UsageComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ProfileRouting,
    HttpClientModule,
    OverlayModule,
    MatDialogModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    // ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    ConfirmBoxConfigModule.forRoot({
      ConfirmBoxCoreConfig: {
         Width: '50%', // string value with '%' or 'px' as the suffix
         Height: '50%', // string value with '%' or 'px' as the suffix
         ButtonPosition: 'right', // check API documentation VerticalPosition
         LayoutType: DialogLayoutDisplay.WARNING, // check API documentation DialogLayoutDisplay
         Dispatch: {
           Title: 'Global default title.',
           Message: 'Global default message.',
         },
         
         ConfirmLabel: 'Confirm', // default confirmation button label
         DeclineLabel: 'Decline', // default declination button label
         DisableIcon: true, // Disable icon by default
         AllowHTMLMessage: true, // Allow HTML content in message by default
      },
      // custom buttons overrides the buttons set with ConfirmLabel & DeclineLabel
      Buttons: [
        new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY), // check API documentation ButtonLayoutDisplay
        new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
     ]
   })
   
    
    
    
  ],
  providers: [
  API_Services,
  SharedService,
  MatDialog,OverlayModule,MatDialogConfig
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
