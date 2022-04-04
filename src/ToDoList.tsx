import { useForm } from "react-hook-form";

interface IData {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IData>();
  const onValid = (data: IData) => {
    console.log("add a To Do", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "Write a To DO" })}
          placeholder="write a Subject"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
