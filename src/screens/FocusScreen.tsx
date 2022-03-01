import { computeHeadingLevel } from "@testing-library/react";
import { nanoid } from "nanoid";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { resolveTripleslashReference } from "typescript";
import useTaskStore from "../hooks/use-task-store";
import { tasksApi, Task } from "../types"
import { colors, TextButton } from "../styles";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width:100vw;
    height: 100xh;
`

const FocusedTask = styled.div`
    border-radius: 15px;
    margin-bottom: 30px;
    padding: 50px 20px;
    justify-content: center;     
    text-align: center;
    font-size: 23px;
    font-weight: bold;

`

const CompleteTask = styled.button`
    background: ${colors.yellow_kizou};
    border: none;
    padding: 20px;
    border-radius: 15px;
    color: #000;
    margin-bottom: 40px;
    font-size: &§px;
`

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
        <Container>
          <FocusedTask><code>{focusedTask.label}</code></FocusedTask>
          <CompleteTask onClick={() => updateTaskCompletion(focusedTask.id, true)}><code>Complete Task</code></CompleteTask>        
          <TextButton onClick={() => shuffleFocusedTask()}><code>Give me another Task</code></TextButton>        

        </Container>
    : <div>No tasks.</div>
} 



export default FocusScreen
