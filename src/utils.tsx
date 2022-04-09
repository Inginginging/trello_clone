import { useEffect } from "react";
import { DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater } from "recoil";
import { IToDoState } from "./atoms";

//info는 onDragEnd func이 가지는 args에서 제공하는 property
export const onDragEnd = (
  info: DropResult,
  setToDos: SetterOrUpdater<IToDoState>
) => {
  const { destination, source } = info;
  if (!destination) return;
  //trashcan
  if (destination.droppableId === "trashcan") {
    setToDos((originalBoards) => {
      const temp = [...originalBoards[source.droppableId]]; //source board copy
      temp.splice(source.index, 1);
      return {
        ...originalBoards,
        [source.droppableId]: temp,
      };
    });
  }
  //moving on the same board
  if (destination.droppableId === source.droppableId) {
    setToDos((originalBoards) => {
      const temp = [...originalBoards[source.droppableId]]; //originalBoards는 obj이므로, source의 droppableId에 해당하는 key의  value를 복사
      const tempObj = temp[source.index]; //이동시킬 toDo Obj 복사
      temp.splice(source.index, 1);
      temp.splice(destination.index, 0, tempObj);
      //toDoState는 obj이므로 obj를 return 해야함
      return {
        ...originalBoards,
        [source.droppableId]: temp,
      };
    });
  }
  //moving across the boards
  if (destination.droppableId !== source.droppableId) {
    setToDos((originalBoards) => {
      const sourceTemp = [...originalBoards[source.droppableId]]; //source board copy
      const destinationTemp = [...originalBoards[destination.droppableId]]; //destination board copy
      const tempObj = sourceTemp[source.index]; //toDo obj copy
      sourceTemp.splice(source.index, 1);
      destinationTemp.splice(destination.index, 0, tempObj);
      return {
        ...originalBoards,
        [source.droppableId]: sourceTemp,
        [destination.droppableId]: destinationTemp,
      };
    });
  }
};
