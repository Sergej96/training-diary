import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ArrayMapPipe } from "src/app/pipes/array-map.pipe";
import { ShareModule } from "src/app/shared/shared.module";
import { ExerciseDetailsComponent } from "./exercise-details/exercise-details.component";
import { ExerciseFormComponent } from "./exercise-form/exercise-form.component";
import { ExerciseGuideComponent } from "./exercise-guide.component";
import { ExerciseListComponent } from "./exercise-list/exercise-list.component";

@NgModule({
  declarations: [
    ExerciseGuideComponent,
    ExerciseListComponent,
    ExerciseFormComponent,
    ExerciseDetailsComponent
  ],
  imports: [
    ShareModule,
    RouterModule
  ]
})
export class ExerciseGuideModule { }
