import { atom } from "recoil";

//Todo의 type
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

//ToDos의 state. 처음엔 빈 배열. IToDo형식의 객체가 추가됨.
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
