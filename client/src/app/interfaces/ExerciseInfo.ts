import { Muscle } from "./Muscle";

export interface ExerciseInfo{
  _id?: string,
  name: string,
  description: string,
  technique: string,
  recomend: string,
  muscles: Muscle[]
}
