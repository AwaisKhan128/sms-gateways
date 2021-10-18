import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { BillingComponent } from './MyComponents/billing/billing.component';
import { BillingContactComponent } from './MyComponents/Childs/Billing/billing-contact/billing-contact.component';
import { ManageCardsComponent } from './MyComponents/Childs/Billing/manage-cards/manage-cards.component';
import { TransactionsComponent } from './MyComponents/Childs/Billing/transactions/transactions.component';
import { UsageComponent } from './MyComponents/Childs/Billing/usage/usage.component';
import { SenderMmsComponent } from './MyComponents/Childs/messages/sender_mms/sender-mms/sender-mms.component';
import { SenderRemoteSmsComponent } from './MyComponents/Childs/messages/sender_remote_sms/sender-remote-sms/sender-remote-sms.component';
import { SenderSmsComponent } from './MyComponents/Childs/messages/sender_sms/sender-sms/sender-sms.component';
import { MobTopComponent } from './MyComponents/Childs/Topups/mob-top/mob-top.component';
import { WebTopComponent } from './MyComponents/Childs/Topups/web-top/web-top.component';
import { ContactsComponent } from './MyComponents/contacts/contacts.component';

import { CreateAccComponent } from './MyComponents/create-acc/create-acc.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { DeviceSettingsComponent } from './MyComponents/device-settings/device-settings.component';
import { GeolocationCodesComponent } from './MyComponents/geolocation-codes/geolocation-codes.component';
import { MessagesComponent } from './MyComponents/messages/messages.component';
import { PersonalComponent } from './MyComponents/personal/personal.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { ResellersComponent } from './MyComponents/resellers/resellers.component';
import { SenderComponent } from './MyComponents/sender/sender.component';
import { SignInComponent } from './MyComponents/sign-in/sign-in.component';
import { TemplatesComponent } from './MyComponents/templates/templates.component';
import { TopupsComponent } from './MyComponents/topups/topups.component';
import { VerifyComponent } from './MyComponents/verify/verify.component';
import { OperatorConfigurationComponent } from './operator-configuration/operator-configuration.component';





const routes: Routes = [
  { path: '', component: SignInComponent},
  { path : 'createacc', component : CreateAccComponent},
  { path : 'verify' , component : VerifyComponent},
  { path : 'profile', component : ProfileComponent,
  children: [
    {
      path: 'dashboard', // child route path
      component: DashboardComponent, // child route component that the router renders
    },
        
    {
      path: 'personal',
      component: PersonalComponent, // another child route component that the router renders
    },

    {
      path: 'templates',
      component: TemplatesComponent, // another child route component that the router renders
    },

    {
      path: 'contacts',
      component: ContactsComponent, // another child route component that the router renders
    },

    {
      path: 'messages',
      component: MessagesComponent, // another child route component that the router renders
    },

    {
      path: 'sender',
      component: SenderComponent, // another child route component that the router renders
      children: [
        {
          path: 'sms', // child route path
          component: SenderSmsComponent, // child route component that the router renders
        },
            
        {
          path: 'remote_sms',
          component: SenderRemoteSmsComponent, // another child route component that the router renders
        },
        {
          path: 'mms',
          component: SenderMmsComponent, // another child route component that the router renders
        }
      ]
    },

    {
      path: 'topup',
      component: TopupsComponent, // another child route component that the router renders
      children: [
        {
          path: 'topup_web', // child route path
          component: WebTopComponent, // child route component that the router renders
        },
            
        {
          path: 'topup_mobile',
          component: MobTopComponent, // another child route component that the router renders
        }
    
      ]
    },

    {
      path: 'billing',
      component: BillingComponent, // another child route component that the router renders
      children: [
        {
          path: 'billingcontact', // child route path
          component: BillingContactComponent, // child route component that the router renders
        },
            
        {
          path: 'transaction',
          component: TransactionsComponent, // another child route component that the router renders
        },
    
        {
          path: 'manage_cards',
          component: ManageCardsComponent, // another child route component that the router renders
        },
    
        {
          path: 'usage',
          component: UsageComponent, // another child route component that the router renders
        }
    
      ]
    },

    {
      path: 'reseller',
      component: ResellersComponent, // another child route component that the router renders
    },

    {
      path: 'admin',
      component: AdminComponent, // another child route component that the router renders
    },

    {
      path: 'device',
      component: DeviceSettingsComponent, // another child route component that the router renders
    },
    {
      path: 'operator_config',
      component: OperatorConfigurationComponent, // another child route component that the router renders
    }

  ]},
  // { path : 'verify', component:VerifyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
