import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountLayoutsComponent } from './shared/layouts/account-layouts/account-layouts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';

const routes: Routes = [
  {
    path: 'account', component: AccountLayoutsComponent,
    loadChildren: () => import('./components/account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AccountLayoutsComponent,
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthAdminGuard]
  },
  {
    path: '', component: SiteLayoutsComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
