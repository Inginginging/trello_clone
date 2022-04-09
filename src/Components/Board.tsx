import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
//snapshot interface
interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#fda50f"
      : props.draggingFromThisWith
      ? "#fcf4a3"
      : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;
const DelBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin-bottom: 9px;
  font-size: 20px;
  position: absolute;
  right: 25px;
`;
const BoardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

interface IForm {
  toDo: string;
}
interface IBoardProps {
  toDos: IToDo[]; //board에는 toDos 배열 type을 prop으로 받아드려 그 내용을 map해서 나열.
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState); //toDo obj를 create할때 toDoState를 변경시키기 위함.
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = { id: Date.now(), text: toDo }; //create할 toDo Obj
    setToDos((originalBoards) => {
      return {
        ...originalBoards, //기존의 board들
        [boardId]: [...originalBoards[boardId], newToDo], //newToDo가 생길 board의 기존 Obj들 그대로 가져오고 newToDo 추가
      };
    });

    setValue("toDo", "");
  };
  const handleDelete = (boardId: string) => {
    setToDos((originalToDos) => {
      const temp = { ...originalToDos }; //typeof(temp) = obj
      delete temp[boardId];
      return temp;
    });
  };
  return (
    <Wrapper>
      <BoardTitle>
        <Title>{boardId}</Title>
        <DelBtn onClick={() => handleDelete(boardId)}>x</DelBtn>
      </BoardTitle>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add Task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          /* provided는 dnd에서 제공하는 drag n drop을 위한 property*/
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                boardId={boardId}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
