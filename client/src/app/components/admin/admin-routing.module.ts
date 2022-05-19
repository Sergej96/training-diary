import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExerciseFormComponent } from "../pages/exercise-guide/exercise-form/exercise-form.component";
import { ExerciseGuideComponent } from "../pages/exercise-guide/exercise-guide.component";
import { AllUsersComponent } from "./components/all-users/all-users.component";
import { DashbordComponent } from "./components/dashbord/dashbord.component";
import { TrainingsFormComponent } from "./components/training-form/training-form.component";

const routes: Routes = [
  { path: '', component: DashbordComponent },
  { path: 'training/progress' },
  { path: 'exercises', component: ExerciseGuideComponent },
  { path: 'exercises/new', component: ExerciseFormComponent },
  { path: 'exercises/:id', component: ExerciseFormComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'users/:id/training', component: TrainingsFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
