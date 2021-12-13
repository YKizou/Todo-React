import { nanoid } from "nanoid";
import React, {ChangeEvent, KeyboardEvent, useState, useContext} from "react";
import { resolveTripleslashReference } from "typescript";
import TaskContext from "../contexts/task-store";
import useTaskStore from "../hooks/use-task-store";
import { tasksApi } from "../types"


type Props = {};

type Task = {
    id : string;
    label: string;
    isComplete: boolean;
}

const ListScreen: React.FC<Props> = () => {
    const {tasks, setTasks, updateTaskCompletion} = useTaskStore();
    const value = useContext(TaskContext);
    const [newTaskLabel, setNewTaskLabel] = useState('');
    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value)
    const handleNewTaskKeyChange = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTaskLabel !== '') {
            setTasks((tasks) => [...tasks, {id: nanoid(), label : newTaskLabel, isComplete:false}]);
            setNewTaskLabel("");
        }
    }; 

    const handleCompleteChange = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
        updateTaskCompletion(task.id, e.target.checked)
    };

    // HandleClearCompleted filters and delete all completed tasks.
    const handleClearCompleted = () => {
        setTasks(tasks => tasks.filter(task => !task.isComplete));
    }

    // handleTaskDelete deletes a task 
    const handleTaskDelete = (handledTask : Task) => () => {
        setTasks(tasks => tasks.filter(task=> task !== handledTask))
    }

    return (
        <div>
            <div>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <input type="checkbox" checked={task.isComplete} onChange={handleCompleteChange(task)} />{task.label}<button onClick={handleTaskDelete(task)}>delete</button>
                    </div>
                
                ))}
            </div>
            <input value={newTaskLabel} 
            onChange={handleNewTaskLabelChange} 
            onKeyPress={handleNewTaskKeyChange} />
            <div><button onClick={handleClearCompleted}>Clear Completed tasks</button></div>

        </div>
    )
} 


export default ListScreen
