import { nanoid } from "nanoid";
import React, {ChangeEvent, KeyboardEvent, useState, useContext} from "react";
import { resolveTripleslashReference } from "typescript";
import TaskContext from "../contexts/task-store";
import useTaskStore from "../hooks/use-task-store";
import { tasksApi } from "../types"
import styled from "styled-components";
import { TextButton } from "../styles";
import DeleteIcon from "../icons/DeleteIcon";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width:60vw;
`


const List = styled.div`
    background: rgba(255,255, 255, 0.1); 
    border-radius: 0.25rem;
    margin-bottom: 30px;
    padding: 50px 20px;
`

const ListItem = styled.div`
    padding: 8px;
    display: flex;
`
const Label = styled.label`
    flex: 1;
`
const DeleteTask = styled.label`
    cursor: pointer;

    &:hover {
        transition: transform 0.2s ease-in;
        transform: rotate(45deg);

    }

`

const Input = styled.input`
    background: #000;
    border: none;
    padding: 20px 24px;
    border-radius: 0.25rem;
    color: #fff;
    margin-bottom: 20px;
    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 20px;
      font-family: "Lucida Console","Courier New", monospac;
    }
    :-ms-input-placeholder {
      font-size: 20px;
      font-weight: bold;
      font-family: "Lucida Console","Courier New", monospac;
    }
`


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
        <Container>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <Label>
                            <input type="checkbox" checked={task.isComplete} onChange={handleCompleteChange(task)} /><code>{task.label}</code>
                        </Label>
                        <DeleteTask onClick={handleTaskDelete(task)}>
                           <DeleteIcon />
                        </DeleteTask>
                    </ListItem>
                
                ))}
            </List>
            <Input value={newTaskLabel} 
            onChange={handleNewTaskLabelChange} 
            onKeyPress={handleNewTaskKeyChange} placeholder="Add a task here..."/>
            <TextButton onClick={handleClearCompleted}><code>Clear Completed tasks</code></TextButton>

        </Container>
    )
} 


export default ListScreen
