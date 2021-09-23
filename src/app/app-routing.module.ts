import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccComponent } from './MyComponents/create-acc/create-acc.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { SignInComponent } from './MyComponents/sign-in/sign-in.component';
import { VerifyComponent } from './MyComponents/verify/verify.component';





const routes: Routes = [
  { path: '', component: SignInComponent},
  { path : 'createacc', component : CreateAccComponent},
  { path : 'profile', component : ProfileComponent},
  { path : 'verify', component:VerifyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
