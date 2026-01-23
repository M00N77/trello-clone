import TaskItem from "./TaskItem"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import type { Column } from "../types";

interface ColumnItemsProps {
  column: Column,
  index: number;
  onHandleAddTask: (columnId: string) => void,
  onHandleDeleteTask: (colimnId: string, taskId: string) => void;
  onHandleEditTaskContent: (columnId: string, taskId: string) => void;
  onHandleDeleteColumn: (columnId: string) => void;

}

const ColumnItem = ({ column, index, onHandleAddTask, onHandleDeleteTask, onHandleEditTaskContent, onHandleDeleteColumn }: ColumnItemsProps) => {
  return (

    <Draggable key={column.id} draggableId={column.id} index={index}  >
      {(provided) => (
        <div
          className=" flex flex-col  align-top border w-72 rounded-md shrink-0"
          key={column.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-center px-3 py-2">
            <h2 className="text-center  font-bold">{column.title}</h2>
            <button
              className="text-xs text-red-300 font-bold"
              onClick={() => onHandleDeleteColumn(column.id)}
            >X</button>
          </div>

          <Droppable droppableId={column.id} >

            {(provided) => (

              <ul
                className="flex flex-col gap-y-4 "
                ref={provided.innerRef}
                {...provided.droppableProps}

              >
                {column.tasks.map((task, index) => (

                  <TaskItem key={task.id} column={column} task={task} index={index} onHandleDeleteTask={onHandleDeleteTask} onHandleEditTaskContent={onHandleEditTaskContent} />
                ))}
                {provided.placeholder}
                <button
                  className="bg-slate-50 px-1 py-2 rounded-md"
                  onClick={() => onHandleAddTask(column.id)}
                >Add task</button>
              </ul>)}

          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default ColumnItem