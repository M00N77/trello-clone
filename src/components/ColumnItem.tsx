import TaskItem from "./TaskItem"
import { Droppable } from "@hello-pangea/dnd"
import type { Column } from "../types";

interface ColumnItemsProps { 
  column: Column,
  onHandleAddTask: (columnId : string) => void,
  onHandleDeleteTask: (colimnId:string,taskId:string)=>void;
  onHandleEditTaskContent: (columnId:string,taskId:string) => void;
  
}

const ColumnItem = ({column,onHandleAddTask,onHandleDeleteTask,onHandleEditTaskContent}:ColumnItemsProps) => { 
    return (
        <div className=" flex flex-col  align-top border w-72 rounded-md shrink-0" key={column.id}>

                  <h2 className="text-center px-3 py-2 font-bold">{column.title}</h2>

                  
                  <Droppable droppableId={column.id}>

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
    )
}

export default ColumnItem