import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const AddBoard = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 10%;
`;

interface IForm {
  board: string;
}

function AddBoardForm() {
  const { register, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ board }: IForm) => {
    const newBoard = board;
    setToDos((originalBoards) => {
      return {
        ...originalBoards,
        [newBoard]: [],
      };
    });
  };
  return (
    <AddBoard onSubmit={handleSubmit(onValid)}>
      <input
        {...register("board", { required: true })}
        type="text"
        placeholder="Add New Board"
      />
    </AddBoard>
  );
}

export default AddBoardForm;
