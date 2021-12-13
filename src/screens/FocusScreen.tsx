import { computeHeadingLevel } from "@testing-library/react";
import { nanoid } from "nanoid";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { resolveTripleslashReference } from "typescript";
import useTaskStore from "../hooks/use-task-store";
import { tasksApi, Task } from "../types"

type Props = {};

const FocusScreen: React.FC<Props> = () => {

    // const UncompletedTask: Task  = UncompletedTasks[0]

    // const handlePassTask = (Tasks : (Task | undefined)[]) => {
    //   Tasks.push(Tasks.shift());
    //   UncompletedTasks = Tasks!;
    //   console.log(Tasks, UncompletedTask); 
    // }

    const {tasks, setTasks, updateTaskCompletion, focusedTask, shuffleFocusedTask} = useTaskStore();

    return focusedTask ?
        <div>
          {focusedTask.label}<br/>
          <button onClick={() => updateTaskCompletion(focusedTask.id, true)}>Complete Task</button>        
          <button onClick={() => shuffleFocusedTask()}> Give me another Task</button>        

        </div>
    : <div>No tasks.</div>
} 



export default FocusScreen
