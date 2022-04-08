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
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //draggableId ,destination과 source는 onDragEnd func이 가지는 args에서 제공하는 property
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return; //card가 제자리 이동일때
    /*setToDos((oldToDos) => {
      const temp = [...oldToDos];
      // 1) Delete item on source.index
      temp.splice(source.index, 1);
      // 2) Put back the item on the destination.index
      temp.splice(destination.index, 0, draggableId);
      return temp;
    });*/
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
