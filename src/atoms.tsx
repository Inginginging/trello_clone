import { atom, selector } from "recoil";

//toDoState의 type
interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d"],
    Done: ["e", "f"],
  },
});
