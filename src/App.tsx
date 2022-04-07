import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided) => (
            /* provided는 dnd에서 제공하는 drag n drop을 위한 property*/
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(provided) => (
                  <li {...provided.draggableProps} ref={provided.innerRef}>
                    <span {...provided.dragHandleProps}>❤</span>
                    one
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(provided) => (
                  <li {...provided.draggableProps} ref={provided.innerRef}>
                    <span {...provided.dragHandleProps}>❤</span>
                    two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
