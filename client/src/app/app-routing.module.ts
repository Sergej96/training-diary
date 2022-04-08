import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './components/account/components/all-users/all-users.component';
import { TrainingFormComponent } from './components/account/components/training-form/training-form.component';
import { DashbordComponent } from './components/account/components/dashbord/dashbord.component';
import { ProgressTrainingComponent } from './components/account/components/progress-training/progress-training.component';
import { TrainingComponent } from './components/account/components/training/training.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';

const routes: Routes = [
  {path: '', component: SiteLayoutsComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent}
  ]},
  {path: 'account', component: DashbordComponent, canActivate: [AuthGuard], children: [
    {path: 'training', component: TrainingComponent},
    {path: 'training/new', component: TrainingFormComponent},
    {path: 'training/progress', component: ProgressTrainingComponent},
    {path: 'all-users', component: AllUsersComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
