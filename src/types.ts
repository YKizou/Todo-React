export type Task = {
  id : string;
  label: string;
  isComplete: boolean;
}


export type tasksApi = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTaskCompletion: (taskId: string, isComplete:boolean) => void;
  focusedTask: Task | undefined;
  shuffleFocusedTask: (tasks: Task[]) => void;
};