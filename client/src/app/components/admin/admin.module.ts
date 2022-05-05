import { NgModule } from '@angular/core';

import { AccountLayoutsComponent } from '../../shared/layouts/account-layouts/account-layouts.component';
import { ProgressTrainingComponent } from './components/progress-training/progress-training.component';
import { TrainingsFormComponent } from './components/training-form/training-form.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ShareModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ExerciseDialog, ExerciseModalComponent } from './components/training-form/exercise-modal/exercise-modal.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ExerciseFormComponent } from './components/exercises/exercise-form/exercise-form.component';


@NgModule({
  declarations: [
    AccountLayoutsComponent,
    AllUsersComponent,
    TrainingsFormComponent,
    ProgressTrainingComponent,
    DashbordComponent,
    ExerciseModalComponent,
    ExerciseDialog,
    ExercisesComponent,
    ExerciseFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    ShareModule,
    AppRoutingModule,
  ]
})
export class AdminModule { }
