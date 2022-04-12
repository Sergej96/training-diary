import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingFormComponent } from './components/admin/components/training-form/training-form.component';
import { AccountLayoutsComponent } from './shared/layouts/account-layouts/account-layouts.component';
import { ProgressTrainingComponent } from './components/admin/components/progress-training/progress-training.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { MainComponent } from './components/account/components/main/main.component';
import { DashbordComponent } from './components/admin/components/dashbord/dashbord.component';
import { AllUsersComponent } from './components/admin/components/all-users/all-users.component';

const routes: Routes = [
  {
    path: '', component: SiteLayoutsComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  {
    path: 'account', component: AccountLayoutsComponent, canActivate: [AuthGuard], children: [
      { path: '', component: MainComponent },
    ]
  },
  {
    path: 'admin', component: AccountLayoutsComponent, canActivate: [AuthAdminGuard], children: [
      { path: '', component: DashbordComponent },
      { path: 'training/:id', component: TrainingFormComponent },
      { path: 'training/new', component: TrainingFormComponent },
      { path: 'training/edit/:id', component: TrainingFormComponent },
      { path: 'training/progress', component: ProgressTrainingComponent },
      { path: 'users', component: AllUsersComponent },
      { path: 'users/:id/training', component: TrainingFormComponent }

    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
