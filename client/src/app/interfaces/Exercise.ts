import { Approache } from "./Approache";

export interface Exercise {
  name: string,
  descriptions: string,
  muscle: string,
  approaches: Approache[]
  _id?: string
}
