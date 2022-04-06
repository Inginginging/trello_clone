import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  //toDoState를 set하기 위한 setToDos
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      //click된 toDo의 index
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      //새로운 category로 바뀐 toDo
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIdx),
        newToDo,
        ...oldToDos.slice(targetIdx + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
    </li>
  );
}

export default ToDo;
