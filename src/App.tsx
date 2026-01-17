import { useState } from "react";
import type { Column } from "./types"





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

  const [columns,setColumns] = useState(initialData)

  
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

          <div className="flex gap-x-10">
          

          {columns.map(column=>(
             

            
            
              <div className=" flex flex-col border w-72  shrink-0" key={column.id}>
              <h2 className="text-center px-3 py-2 font-bold">{column.title}</h2>
              <div>
                <ul className="flex flex-col gap-y-4 ">

                  {column.tasks.map(task=>(
                    <li className="" key={task.id}>
                    <div className="shrink-1 border rounded-md bg-slate-100 px-2 py-4">
                      <h3 className="font-bold" >{task.content}</h3>

                      <p className="inline-flex p-1 rounded-lg text-red-500  bg-red-100 text-xs font-semibold" >19 часов</p>
                    </div>
                  </li>
                  ))}
                  

                  

                </ul>
              </div>
            </div>
            )
          )}

            

            

            

            
          </div>
        </div>
      </main>

    </>
  )
}

export default App
