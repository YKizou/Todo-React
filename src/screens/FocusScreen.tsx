import { computeHeadingLevel } from "@testing-library/react";
import { nanoid } from "nanoid";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { resolveTripleslashReference } from "typescript";
import { tasksApi, Task } from "../types"

type Props = tasksApi & {};

const FocusScreen: React.FC<Props> = ({tasks, setTasks, updateTaskCompletion}) => {
    const UncompletedTasks = tasks.filter( task =>  task.isComplete === false);

    return UncompletedTasks[0] ?
        <div>
          {UncompletedTasks[0].label}<br/>
          <button onClick={() => updateTaskCompletion(UncompletedTasks[0].id, true)}>Complete Task</button>        </div>
    : <div>No tasks.</div>
} 



export default FocusScreen
