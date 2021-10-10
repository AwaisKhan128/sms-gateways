import { Create_Contact, Update_Contact } from './Classes/manage_contacts';
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
import {MatSidenavModule} from '@angular/material/sidenav';





import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { DatePipe } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';



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
import { SimpledialogComponent } from './MyComponents/simpledialog/simpledialog.component'
import { SampleComponent } from './MyComponents/sample/sample.component'

import { DatepickerComponent } from './MyComponents/others/datepicker/datepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebTopComponent } from './MyComponents/Childs/Topups/web-top/web-top.component';
import { MobTopComponent } from './MyComponents/Childs/Topups/mob-top/mob-top.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { CreateAcc } from './Classes/createAcc_';
import { Create_Reseller } from './Classes/Resellers';
import { Permission } from './Classes/Permissions';
import { TimepickerDirective } from 'ngx-material-timepicker';








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
    SampleComponent,
    SimpledialogComponent,
    DatepickerComponent,
    WebTopComponent,
    MobTopComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NgxMaterialTimepickerModule,
    NgxAwesomePopupModule.forRoot({
      ColorList: {
        Success: '#3caea3', // optional
        Info: '#2f8ee5', // optional
        Warning: '#ffc107', // optional
        Danger: '#e46464', // optional
      },
    }), // Essential, mandatory main module.
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSidenavModule,
    MatPaginatorModule,
    TimepickerDirective,
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
   }), BrowserAnimationsModule
   
    
    
    
  ],
  providers: [
  API_Services,
  SharedService,
  MatDialog,OverlayModule,MatDialogConfig,DatePipe
  
  ,MatDatepickerModule,MatFormFieldModule
  ,MatNativeDateModule,MatSidenavModule,Permission
  ,Create_Contact,Update_Contact,CreateAcc,Create_Reseller
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
