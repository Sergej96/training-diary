import { NgModule } from '@angular/core';

import { TrainingFormComponent } from './components/training-form/training-form.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ProgressTrainingComponent } from './components/progress-training/progress-training.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ShareModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TrainingComponent } from './components/training/training.component';


@NgModule({
  declarations: [
    DashbordComponent,
    AllUsersComponent,
    TrainingFormComponent,
    ProgressTrainingComponent,
    TrainingComponent,
  ],
  imports: [
    ShareModule,
    AppRoutingModule,
  ]
})
export class AccountModule { }
