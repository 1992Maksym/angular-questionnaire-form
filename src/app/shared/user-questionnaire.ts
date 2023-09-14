import {Hobby} from "./hobby";

export interface UserQuestionnaire {
  firstName: string,
  lastName: string,
  dateOfBirth: string
  framework: string,
  frameworkVersion: string,
  email: string,
  hobby: Hobby[]
}
