import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IData {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IData>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IData) => {
    //todo가 valid할때 동작하는 함수 => ToDos의 state를 바꿔줌.
    setToDos((oldToDos) => [
      { text: toDo, category: "TO_DO", id: Date.now() },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: "Write a To DO" })}
        placeholder="write a Subject"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
