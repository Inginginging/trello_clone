import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.span``;
const DelBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 5px 8px;
  font-size: 16px;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const handleDelete = (toDoId: number) => {
    setToDos((originalToDos) => {
      const tempToDos = [...originalToDos[boardId]];
      //click된 toDoId를 빼고 남은 toDo들을 살림
      const filteredToDos = tempToDos.filter((toDo) => toDo.id !== toDoId);
      return {
        ...originalToDos,
        [boardId]: filteredToDos,
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Text>{toDoText}</Text>
          <DelBtn onClick={() => handleDelete(toDoId)}>x</DelBtn>
        </Card>
      )}
    </Draggable>
  );
}

//props(toDo, index)가 변하지 않은 element들은 다시 렌더링 하지 않음.
export default React.memo(DraggableCard);
