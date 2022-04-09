import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaRecycle } from "react-icons/fa";

const TrashCanWrapper = styled.div<{ isDraggingOver: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 30px;
  .trash {
    background: ${(props) =>
      props.isDraggingOver ? "#fda50f" : props.theme.boardColor};
    width: 33px;
    height: 40px;
    display: inline-block;
    margin: 0 auto;
    svg {
      position: absolute;
      top: 13px;
      right: 8px;
      color: gray;
    }
    position: relative;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .trash span {
    position: absolute;
    height: 6px;
    width: 48px;
    background: ${(props) =>
      props.isDraggingOver ? "#fda50f" : props.theme.boardColor};
    top: -10px;
    left: -8px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 250ms;
    transform-origin: 19% 100%;
    display: flex;
    justify-content: center;
  }
  .trash span:after {
    content: "";
    position: absolute;
    width: 13px;
    height: 4px;
    background: ${(props) =>
      props.isDraggingOver ? "#fda50f" : props.theme.boardColor};
    top: -6px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 250ms;
    transform-origin: 19% 100%;
    left: 20px;
  }
`;

function Trashcan() {
  return (
    <Droppable droppableId="trashcan">
      {(provided, snapshot) => (
        <TrashCanWrapper
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <span className="trash">
            <span></span>
            <FaRecycle />
          </span>
        </TrashCanWrapper>
      )}
    </Droppable>
  );
}

export default Trashcan;
