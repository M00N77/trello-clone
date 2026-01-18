import { useState } from "react";
import type { Column } from "./types"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";





const initialData: Column[] = [
  {
    id: 'col-1',
    title: 'To Do',
    tasks: [
      { id: '1', content: 'Сверстать карточку', task_time: 5 },
      { id: '2', content: 'Подключить TS', task_time: 5 }
    ]
  },
  {
    id: 'col-2',
    title: 'In Progress',
    tasks: []
  },
  {
    id: 'col-3',
    title: 'Done',
    tasks: [
      { id: '5', content: 'Выпить чаю', task_time: 5 },
    ]
  }
];

function App() {

  const [columns, setColumns] = useState(initialData)

  const onDragEnd = (result: any) => {
    if (result.source.droppableId === result.destination.droppableId) {
      const tasksList = columns.find((column) => column.id === result.destination.droppableId)?.tasks
      const newTasks = [...tasksList];
      const [removedTask] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, removedTask);
      console.log('newTasks', newTasks);

      const newColumns = columns.map(column => {
        if (column.id === result.destination.droppableId) {
          return {
            ...column,
            tasks: newTasks
          }
        } else { return column }


      })

      setColumns(newColumns)
    } else {
      console.log(result);

      const sourceColumn = result.source.droppableId
      console.log('sourceColumn',sourceColumn);

      const destColumn = result.destination.droppableId


      const sourceTasksList = columns.find((column) => column.id === sourceColumn)?.tasks
      const sourceNewTasks = [...sourceTasksList]
      const [removedTask] = sourceNewTasks.splice(result.source.index,1)

      const destTasksList = columns.find((column)=> column.id === destColumn)?.tasks
      const destNewTasks = [...destTasksList]
      destNewTasks.splice(result.destination.index,0,removedTask)

      const newColumns = columns.map((column)=>{
        if (column.id===sourceColumn) {
          return{
            ...column,
            tasks:sourceNewTasks
          }
        }
        if (column.id===destColumn) {
          return{
            ...column,
            tasks:destNewTasks
          }
        }
        return column
      })

      setColumns(newColumns) 
    }
  }

  return (
    <>

      <header className="flex  justify-center items-center">
        <div>
          <nav>
            <ul className="flex gap-x-2">

              <li><a href="">Задачи</a></li>
              <li><a href="">Задачи</a></li>
              <li><a href="">Задачи</a></li>
              <li><a href="">Задачи</a></li>
              <li><a href="">Задачи</a></li>
              <li><a href="">Задачи</a></li>
              <li><a href="">Задачи</a></li>
              <li><a href="">Задачи</a></li>

            </ul>
          </nav>
        </div>
      </header>

      <main className="flex justify-center items-center">
        <div>
          <div>main_header</div>


          <DragDropContext onDragEnd={onDragEnd} >
            <div className="flex gap-x-10">


              {columns.map(column => (




                <div className=" flex flex-col border w-72  shrink-0" key={column.id}>
                  <h2 className="text-center px-3 py-2 font-bold">{column.title}</h2>

                  <Droppable droppableId={column.id}>

                    {(provided) => (
                      <ul
                        className="flex flex-col gap-y-4 "
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {column.tasks.map((task, index) => (

                          <Draggable key={task.id} draggableId={task.id} index={index} >

                            {(provided) => (
                              <li


                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="shrink-1 border rounded-md bg-slate-50 px-2 py-4">
                                  <h3 className="font-bold" >{task.content}</h3>

                                  <p className="inline-flex p-1 rounded-lg text-red-500  bg-red-100 text-xs font-semibold" >{task.task_time}</p>
                                </div>
                              </li>
                            )}

                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>)}

                  </Droppable>
                </div>
              )
              )}
            </div>
          </DragDropContext>

        </div>
      </main>

    </>
  )
}

export default App
