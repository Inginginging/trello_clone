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

function ToDoList() {
  //여러개의 input을 하나의 객체로 보여줌 => form이 복잡할때 유용
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("email")} placeholder="email" />
        <input {...register("id")} placeholder="id" />
        <input {...register("pw")} placeholder="pw" />
        <input {...register("pw2")} placeholder="pw2" />
        <input {...register("location")} placeholder="location" />
      </form>
    </div>
  );
}

export default ToDoList;
