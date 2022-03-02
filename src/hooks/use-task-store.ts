import { useEffect, useContext } from "react";
import TaskContext from "../contexts/task-store";
import { Task } from "../types";
import useLocalStorage from "./use-local-storage";

const useTaskStore = () => {
  const [tasks, setTasks] = useContext(TaskContext);
  const [focusedTask, setFocusedTask] = useLocalStorage<Task>(
    "focused",
    tasks.filter((task) => task.isComplete === false)[0]
  );

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );
  };

  const UncompletedTasks = tasks.filter((task) => task.isComplete === false);

  const shuffleFocusedTask = () => {
    let shuffledTasks = [...UncompletedTasks];
    let currentIndex = shuffledTasks.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [shuffledTasks[currentIndex], shuffledTasks[randomIndex]] = [
        shuffledTasks[randomIndex],
        shuffledTasks[currentIndex],
      ];
    }
    return setFocusedTask(shuffledTasks[0]);
  };

  useEffect(() => {
    shuffleFocusedTask();
    console.log(focusedTask, tasks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, focusedTask]);

  const api = {
    tasks,
    setTasks,
    updateTaskCompletion,
    focusedTask,
    shuffleFocusedTask,
  };

  return api;
};

export default useTaskStore;
