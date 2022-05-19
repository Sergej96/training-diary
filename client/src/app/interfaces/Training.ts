import { Exercise } from "./Exercise"

export interface Training {
  userId: String,
  date: Date,
  exercises: Exercise[],
  _id?: string
}
