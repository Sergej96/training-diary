import { NgModule } from '@angular/core';

import { TrainingFormComponent } from './components/training-form/training-form.component';
import { AccountLayoutsComponent } from '../../shared/layouts/account-layouts/account-layouts.component';
import { ProgressTrainingComponent } from './components/progress-training/progress-training.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ShareModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ExcerciseDialog, ExcerciseFormComponent } from './components/training-form/excercise-form/excercise-form.component';


@NgModule({
  declarations: [
    AccountLayoutsComponent,
    AllUsersComponent,
    TrainingFormComponent,
    ProgressTrainingComponent,
    DashbordComponent,
    ExcerciseFormComponent,
    ExcerciseDialog

  ],
  imports: [
    ReactiveFormsModule,
    ShareModule,
    AppRoutingModule,
  ]
})
export class AdminModule { }
