import { IToDo } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("i wanna go to", newCategory);
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
