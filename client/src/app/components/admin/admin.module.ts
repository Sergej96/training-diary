import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountLayoutsComponent } from '../../shared/layouts/account-layouts/account-layouts.component';
import { TrainingsFormComponent } from './components/training-form/training-form.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ShareModule } from 'src/app/shared/shared.module';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ExerciseDialog, AddExerciseModalComponent } from './components/training-form/add-exercise-modal/add-exercise-modal.component';
import { ExercisesFormArrayComponent } from './components/training-form/exercises-form-array/exercises-form-array.component';
import { ExerciseFormControlComponent } from './components/training-form/exercises-form-array/exercise-form-control/exercise-form-control.component';
import { ApproachesFormArrayComponent } from './components/training-form/approaches-form-array/approaches-form-array.component';
import { ApproacheFormControlComponent } from './components/training-form/approaches-form-array/approache-form-control/approache-form-control.component';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AccountLayoutsComponent,
    AllUsersComponent,
    TrainingsFormComponent,
    DashbordComponent,
    AddExerciseModalComponent,
    ExerciseDialog,
    ExercisesFormArrayComponent,
    ExerciseFormControlComponent,
    ApproacheFormControlComponent,
    ApproachesFormArrayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShareModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
