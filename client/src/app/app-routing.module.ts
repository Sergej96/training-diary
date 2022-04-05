import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { DefaultLayoutsComponent } from './shared/layouts/default-layouts/default-layouts.component';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';

const routes: Routes = [
  {path: '', component: SiteLayoutsComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent}
  ]},
  {path: '', component: DefaultLayoutsComponent, canActivate: [AuthGuard], children: [
    {path: 'account', component: AccountComponent}
  ]
    
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
