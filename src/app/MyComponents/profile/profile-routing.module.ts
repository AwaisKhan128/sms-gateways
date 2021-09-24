import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from '../billing/billing.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { PersonalComponent } from '../personal/personal.component';
import { SenderComponent } from '../sender/sender.component';
import { TemplatesComponent } from '../templates/templates.component';
import { TopupsComponent } from '../topups/topups.component';



const routes: Routes = [

  { path : 'profile/dashboard', component : DashboardComponent},
  { path : 'profile/personal', component : PersonalComponent},
  { path : 'profile/templates', component : TemplatesComponent},
  { path : 'profile/contacts', component : ContactsComponent},
  { path : 'profile/messages', component : MessagesComponent},
  { path : 'profile/sender', component : SenderComponent},
  { path : 'profile/topup', component : TopupsComponent},
  { path : 'profile/billing', component : BillingComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProfileRouting { }
