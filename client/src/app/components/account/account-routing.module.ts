import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExerciseDetailsComponent } from "../pages/exercise-guide/exercise-details/exercise-details.component";
import { ExerciseGuideComponent } from "../pages/exercise-guide/exercise-guide.component";
import { TrainingComponent } from "./components/training/training.component";


const routes: Routes = [
  { path: '', component: TrainingComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'exercises', component: ExerciseGuideComponent },
  { path: 'exercises/:id', component: ExerciseDetailsComponent },
  { path: 'progress' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
