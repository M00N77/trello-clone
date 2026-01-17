export interface Task {
  id: string;      
  content: string; 
  task_time: number;
}


export interface Column {
  id: string;      
  title: string;   
  tasks: Task[];   
}


export type BoardState = Column[];
