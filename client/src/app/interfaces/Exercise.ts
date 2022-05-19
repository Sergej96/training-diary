import { Approache } from "./Approache";
import { ExerciseInfo } from "./ExerciseInfo";

export interface Exercise {
  approaches: Approache[]
  exerciseId: string,
  name?: string,
  info?: ExerciseInfo
}
