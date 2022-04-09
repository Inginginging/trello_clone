import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import AddBoardForm from "./Components/AddBoardForm";
import Board from "./Components/Board";
import Trashcan from "./Components/TrashCan";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //info는 onDragEnd func이 가지는 args에서 제공하는 property
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
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
  //saving local storage
  useEffect(() => {
    const savedToDos = localStorage.getItem("toDos");
    if (savedToDos === null || savedToDos === "{}") return;
    setToDos(JSON.parse(savedToDos as any));
  }, []);
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  return (
    <>
      <AddBoardForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {
              /*toDoState에서 toDos는 객체이므로, key들을 가져와 각 key들의 value값을 mapping하여 Board로 props 전달 */
              Object.keys(toDos).map((boardId) => (
                <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
              ))
            }
          </Boards>
          <Trashcan />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
