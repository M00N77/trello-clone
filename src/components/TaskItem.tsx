import { Draggable } from "@hello-pangea/dnd"
import type { Task, Column } from "../types";


interface TaskItemProps {
    column: Column;
    task: Task;
    index: number;
    onHandleDeleteTask: (columnId: string, taskId: string) => void; 
    onHandleEditTaskContent: (columnId:string,taskId:string) => void;
}

const TaskItem = ({ column, task, index, onHandleDeleteTask,onHandleEditTaskContent }: TaskItemProps) => {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index} >

            {(provided) => (
                <li className="flex flex-col"

                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                    <div className="shrink-1 border rounded-md bg-slate-50 px-2 py-4">
                        <div className="flex justify-between ">
                            <h3 className="font-bold" onClick={()=>onHandleEditTaskContent(column.id,task.id)}>{task.content}</h3>
                            <button
                                className="  flex justify-center items-center text-center font-bold  rounded-md bg-red-500 text-xs px-2"
                                onClick={() => { onHandleDeleteTask(column.id, task.id) }}
                            >Delete</button>

                        </div>
                        <p className="inline-flex p-1 rounded-lg text-red-500  bg-red-100 text-xs font-semibold" >{task.task_time}</p>

                    </div>
                </li>
            )}
        </Draggable>
    )
}

export default TaskItem