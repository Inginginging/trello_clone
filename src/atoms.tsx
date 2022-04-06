import { atom, selector } from "recoil";

//category의 type을 열거형으로 지정해주는 enum
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

//Todo의 type
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

//ToDos의 state. 처음엔 빈 배열. IToDo형식의 객체가 추가됨.
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    //조건을 만족하는 toDo들의 배열로 return.=>derived state(파생된 state)
    return toDos.filter((toDo) => toDo.category === category);
  },
});
