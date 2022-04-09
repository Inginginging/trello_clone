import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import AddBoardForm from "./Components/AddBoardForm";
import Board from "./Components/Board";
import Trashcan from "./Components/TrashCan";
import { onDragEnd } from "./utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
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
    <Container>
      <AddBoardForm />
      <DragDropContext onDragEnd={(info) => onDragEnd(info, setToDos)}>
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
    </Container>
  );
}

export default App;
