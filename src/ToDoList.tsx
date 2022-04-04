import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setToDo(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="write a to do" />
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  id: string;
  pw: string;
  pw2: string;
  location: string;
}

function ToDoList() {
  //여러개의 input을 하나의 객체로 보여줌 => form이 복잡할때 유용
  const { register, handleSubmit, formState, setError } = useForm<IForm>();
  //form이 valid할때 실행되는 함수. handleSubmit의 인자로 들어감.
  const onValid = (data: IForm) => {
    if (data.pw !== data.pw2) {
      setError(
        "pw2",
        { message: "password is not the same" },
        { shouldFocus: true }
      );
    }
  };
  //formState: form의 상태를 보여주는 메서드
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", { required: "email is required" })}
          placeholder="email"
        />
        <span>{formState.errors?.email?.message}</span>
        <input
          {...register("id", {
            required: "Write HERE",
            minLength: {
              value: 5,
              message: "id is too short",
            },
          })}
          placeholder="id"
        />{" "}
        <span>{formState.errors?.id?.message}</span>
        <input
          {...register("pw", { required: "Write HERE" })}
          placeholder="pw"
        />{" "}
        <span>{formState.errors?.pw?.message}</span>
        <input
          {...register("pw2", { required: "Write HERE" })}
          placeholder="pw2"
        />{" "}
        <span>{formState.errors?.pw2?.message}</span>
        <input
          {...register("location", { required: "Write HERE" })}
          placeholder="location"
        />{" "}
        <span>{formState.errors?.location?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
