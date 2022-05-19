import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShareModule } from 'src/app/shared/shared.module';
import { TrainingComponent } from './components/training/training.component';
import { ExercisesListComponent } from './components/training/exercises-list/exercises-list.component';
import { ExerciseItemComponent } from './components/training/exercises-list/exercise-item/exercise-item.component';
import { ApproachesListComponent } from './components/training/approaches-list/approaches-list.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    ExercisesListComponent,
    ExerciseItemComponent,
    ApproachesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    ShareModule
  ]
})
export class AccountModule { }
