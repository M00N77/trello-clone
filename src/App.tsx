import { useEffect, useState } from "react";
import type { Column } from "./types"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from 'uuid';
import TaskItem from "./components/TaskItem";
import ColumnItem from "./components/ColumnItem";

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

  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('storedColumns')

    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('error parse', e)
      }
    }

    return initialData
  })

  useEffect(() => {
    localStorage.setItem('storedColumns', JSON.stringify(columns))
  }, [columns])

  const onDragEnd = (result: any) => {

    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      const tasksList = columns.find((column) => column.id === result.destination.droppableId)?.tasks
      const newTasks = [...tasksList];
      const [removedTask] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, removedTask);

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

      const sourceColumn = result.source.droppableId
      const sourceTasksList = columns.find((column) => column.id === sourceColumn)?.tasks
      const sourceNewTasks = [...sourceTasksList]
      const [removedTask] = sourceNewTasks.splice(result.source.index, 1)

      const destColumn = result.destination.droppableId
      const destTasksList = columns.find((column) => column.id === destColumn)?.tasks
      const destNewTasks = [...destTasksList]
      destNewTasks.splice(result.destination.index, 0, removedTask)

      const newColumns = columns.map((column) => {
        if (column.id === sourceColumn) {
          return {
            ...column,
            tasks: sourceNewTasks
          }
        }
        if (column.id === destColumn) {
          return {
            ...column,
            tasks: destNewTasks
          }
        }
        return column
      })

      setColumns(newColumns)
    }
  }

  const handleDeleteTask = (column_id:string,task_id:string) => { 
    

    const tasksList = columns.find((column) => column.id === column_id)?.tasks || []
    const newTasks = tasksList.filter((task)=>task.id!==task_id)
    
    const newColumns = columns.map((column)=>{
      if (column.id===column_id) {
        return{
          ...column,
          tasks: newTasks
        }
      }
        return column
    })
    setColumns(newColumns)
  }

  const handleAddTask = (column_id: any) => {
    const taskContent = prompt('Enter task')
    const taskTime = prompt('Enter time')

    if (isNaN(taskTime) || taskTime < 0) {
      alert('Please enter correct number...')
      return
    }
    const newTask = { id: uuidv4(), content: taskContent, task_time: taskTime }

    const tasksList = columns.find((column) => column.id === column_id)?.tasks

    const newTasks = [ ...tasksList, newTask ]



    const newColumns = columns.map((column)=>{
      if (column.id===column_id) {
        return {
          ...column,
          tasks:newTasks
        }
      }
      return column
    })
    setColumns(newColumns)
  }

  const handleEditTaskContent = (column_id : string, task_id : string) => { 
    
    const newTaskContent = prompt('Enter new name taks')
    const tasksList = columns.find((column)=>column.id===column_id)?.tasks

    const newTasks = tasksList.map((task)=>{
      if (task.id===task_id) {
        return{
          ...task,
          content:newTaskContent
        }
      }
      return task
    })

    const newColumns = columns.map((column)=>{
      if (column.id===column_id) {
        return{
          ...column,
          tasks: newTasks
        }
      }
      return column
    })
    setColumns(newColumns)
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
                
                <ColumnItem  key={column.id} column={column} onHandleAddTask={handleAddTask} onHandleDeleteTask={handleDeleteTask} onHandleEditTaskContent={handleEditTaskContent} />
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
