import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const AddBoard = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  position: absolute;
  top: 200px;
  input {
    font-size: 16px;
    border: 3px solid ${(props) => props.theme.boardColor};
    background-color: transparent;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

interface IForm {
  board: string;
}

function AddBoardForm() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ board }: IForm) => {
    const newBoard = board;
    setToDos((originalBoards) => {
      return {
        ...originalBoards,
        [newBoard]: [],
      };
    });
    setValue("board", "");
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
