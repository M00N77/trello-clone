import { useEffect, useState } from "react";
import type { Column } from "./types"
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from 'uuid';
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
    if (result.type === 'TASK') {
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

    if (result.type === 'COLUMN') {
      if (!result.source.index) {
        return;
      }

      const columnsList = [...columns];
      const [removedColumn] = columnsList.splice(result.source.index, 1);

      
      columnsList.splice(result.destination.index, 0, removedColumn)

      setColumns(columnsList)
    }

  }

  const handleDeleteTask = (column_id: string, task_id: string) => {


    const tasksList = columns.find((column) => column.id === column_id)?.tasks || []
    const newTasks = tasksList.filter((task) => task.id !== task_id)

    const newColumns = columns.map((column) => {
      if (column.id === column_id) {
        return {
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

    if (isNaN(taskTime) || taskTime < 0 || taskTime === '') {
      alert('Please enter correct number...')
      return
    }
    const newTask = { id: uuidv4(), content: taskContent, task_time: taskTime }

    const tasksList = columns.find((column) => column.id === column_id)?.tasks

    const newTasks = [...tasksList, newTask]



    const newColumns = columns.map((column) => {
      if (column.id === column_id) {
        return {
          ...column,
          tasks: newTasks
        }
      }
      return column
    })
    setColumns(newColumns)
  }

  const handleEditTaskContent = (column_id: string, task_id: string) => {

    const newTaskContent = prompt('Enter new name taks')
    const tasksList = columns.find((column) => column.id === column_id)?.tasks

    const newTasks = tasksList.map((task) => {
      if (task.id === task_id) {
        return {
          ...task,
          content: newTaskContent
        }
      }
      return task
    })

    const newColumns = columns.map((column) => {
      if (column.id === column_id) {
        return {
          ...column,
          tasks: newTasks
        }
      }
      return column
    })
    setColumns(newColumns)
  }

  const handleDeleteColumn = (column_id) => {
    const newColumns = columns.filter((column) => column.id !== column_id)

    setColumns(newColumns)
  }

  const handleAddColumn = () => {
    if (columns.length>=6) {
      alert('You have reached the limit...')
      return;
    }
    const columnName = prompt('Enter name column')
    if (!columnName) {
      alert('Enter correct name column...');
      return
    }

    const newColumn: Column = {
      id: uuidv4(),
      title: columnName,
      tasks: []
    }

    const newColumns = [...columns, newColumn]
    setColumns(newColumns)
  }

  return (
    <>

      <header className="flex  justify-end items-center">
        <div>
         

              <button className=" bg-slate-50 px-8 py-4 rounded-md bg-green-400" onClick={handleAddColumn} >Add</button>

            
        </div>
      </header>

      <main className="flex justify-center items-center">
        <div>

          




          <DragDropContext onDragEnd={onDragEnd} >



            <Droppable droppableId="board" type="COLUMN" direction="horizontal" >
              {(provided) => (
                <div className="flex gap-x-10"
                  ref={provided.innerRef}       // ✅ СЮДА
                  {...provided.droppableProps}>

                  {columns.map((column, index) => (

                    <ColumnItem
                      key={column.id}
                      column={column}
                      index={index}
                      onHandleAddTask={handleAddTask}
                      onHandleDeleteTask={handleDeleteTask}
                      onHandleEditTaskContent={handleEditTaskContent}
                      onHandleDeleteColumn={handleDeleteColumn}

                    />
                  )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            

          </DragDropContext>


        </div>
      </main>

      
    </>
  )
}

export default App
