import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
//toDoState의 type
interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
