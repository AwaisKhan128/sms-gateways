import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { BillingComponent } from '../billing/billing.component';
import { BillingContactComponent } from '../Childs/Billing/billing-contact/billing-contact.component';
import { ManageCardsComponent } from '../Childs/Billing/manage-cards/manage-cards.component';
import { TransactionsComponent } from '../Childs/Billing/transactions/transactions.component';
import { UsageComponent } from '../Childs/Billing/usage/usage.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { PersonalComponent } from '../personal/personal.component';
import { ResellersComponent } from '../resellers/resellers.component';
import { SenderComponent } from '../sender/sender.component';
import { TemplatesComponent } from '../templates/templates.component';
import { TopupsComponent } from '../topups/topups.component';



const routes: Routes = [

  // { path : 'profile/dashboard', component : DashboardComponent},
  { path : 'profile/billing/dashboard', redirectTo:'profile/dashboard' },

  // { path : 'profile/personal', component : PersonalComponent},
  { path : 'profile/billing/personal', redirectTo:'profile/personal' },

  // { path : 'profile/templates', component : TemplatesComponent},
  { path : 'profile/billing/templates', redirectTo:'profile/templates' },

  // { path : 'profile/contacts', component : ContactsComponent},
  { path : 'profile/billing/contacts', redirectTo:'profile/contacts' },

  // { path : 'profile/messages', component : MessagesComponent},
  { path : 'profile/billing/messages', redirectTo:'profile/messages' },


  // { path : 'profile/sender', component : SenderComponent},
  { path : 'profile/billing/sender', redirectTo:'profile/sender' },

  // { path : 'profile/topup', component : TopupsComponent},
  { path : 'profile/billing/topup', redirectTo:'profile/topup' },

  
  { path : 'profile/billing/Reseller', redirectTo:'profile/Reseller' },

  // { path : 'profile/admin', component : AdminComponent},
  { path : 'profile/billing/admin', redirectTo:'profile/admin' },

  // { path : 'profile/billing/:id', component : AdminComponent}
  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProfileRouting { }
