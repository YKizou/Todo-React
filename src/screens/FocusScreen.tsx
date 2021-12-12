import { computeHeadingLevel } from "@testing-library/react";
import { nanoid } from "nanoid";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { resolveTripleslashReference } from "typescript";
import { TasksProps } from "../types"

type Props = TasksProps & {};

const FocusScreen: React.FC<Props> = ({tasks}) => {
    const task = tasks[0];
    console.log(task)
    return task ?
        <div>
          {task.label}
        </div>
    : <div>No tasks.</div>
} 



export default FocusScreen
