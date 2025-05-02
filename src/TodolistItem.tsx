import {FilterValues, Task} from "./types/types";
import {Button} from "./button/Button.tsx";
import {useState, KeyboardEvent, ChangeEvent} from "react";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeTasksFilter: (value: FilterValues) => void
    createTask: (value: string) => void
}

export const TodolistItem = (props: Props) => {

    const {title, tasks, deleteTask, changeTasksFilter, createTask} = props;

    const [value, setValue] = useState('');

    // const refValue = useRef<HTMLInputElement>(null)

    const addTask = () => {
        // if (refValue.current) {
        //     createTask(refValue.current.value)
        //     refValue.current.value = ''
        // }

        createTask(value)
        setValue('')
    }

    const keyPressHandler = (e: KeyboardEvent) => {
        const key = e.key;
        if (e.metaKey && key === 'Enter') {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input placeholder={'Write . . .'} value={value} onChange={onChangeHandler}
                       onKeyDown={keyPressHandler}/>
                <Button title={'+'} onClick={addTask}/>
            </div>
            {
                !tasks.length
                && <span>Tasks is empty</span>
            }
            {
                tasks &&
                <ul style={{listStyle: 'none', paddingLeft: 0}}>
                    {
                        tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                                    <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeTasksFilter('all')}/>
                <Button title={'Active'} onClick={() => changeTasksFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeTasksFilter('completed')}/>
            </div>
        </div>
    )
}
