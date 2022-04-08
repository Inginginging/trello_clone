import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import DraggableCard from "./Components/DraggableCard";

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
    console.log(info);
    const { destination, source, draggableId } = info;
    if (!destination) return;
    //moving on the same board
    if (destination.droppableId === source.droppableId) {
      setToDos((originalBoards) => {
        const temp = [...originalBoards[source.droppableId]]; //originalBoards는 obj이므로, source의 droppableId에 해당하는 key의  value를 복사
        temp.splice(source.index, 1);
        temp.splice(destination.index, 0, draggableId);
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
        sourceTemp.splice(source.index, 1);
        destinationTemp.splice(destination.index, 0, draggableId);
        return {
          ...originalBoards,
          [source.droppableId]: sourceTemp,
          [destination.droppableId]: destinationTemp,
        };
      });
    }
  };
  return (
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
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
