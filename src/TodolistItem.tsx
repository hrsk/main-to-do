import {FilterValues, Task, Todolist} from "./types/types";
import {Button} from "./button/Button.tsx";
import {useState, KeyboardEvent, ChangeEvent} from "react";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTasksFilter: (todolistId: string, value: FilterValues) => void
    changeTasksStatus: (todolistId: string, taskId: string, value: boolean) => void
    createTask: (todolistId: string, value: string) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id: todolistId, title, filter},
        deleteTodolist,
        tasks,
        deleteTask,
        changeTasksFilter,
        changeTasksStatus,
        createTask
    } = props;

    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    // const refValue = useRef<HTMLInputElement>(null)

    const addTask = () => {
        // if (refValue.current) {
        //     createTask(refValue.current.value)
        //     refValue.current.value = ''
        // }
        const trimmedValue = value.trim();
        if (trimmedValue !== '') {
            createTask(todolistId, trimmedValue)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    const keyPressHandler = (e: KeyboardEvent) => {
        const key = e.key;
        if (e.metaKey && key === 'Enter') {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (error) {
            setError(null)
        }
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    return (
        <div>
            <h3>{title} <Button title={'x'} onClick={deleteTodolistHandler}/></h3>
            <div>

                <input className={error ? 'error' : undefined} placeholder={'Write . . .'} value={value}
                       onChange={onChangeHandler}
                       onKeyDown={keyPressHandler}/>
                <Button title={'+'} onClick={addTask}/>
                {
                    error &&
                    <span className={error ? 'error-message' : undefined} style={{display: 'block'}}>{error}</span>
                }
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
                            const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTasksStatus(todolistId, task.id, e.currentTarget.checked)
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : undefined}>
                                    <input type="checkbox" onChange={changeTasksStatusHandler}
                                           checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={() => deleteTask(todolistId, task.id)}/>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : undefined} title={'All'}
                        onClick={() => changeTasksFilter(todolistId, 'all')}/>
                <Button className={filter === 'active' ? 'active-filter' : undefined} title={'Active'}
                        onClick={() => changeTasksFilter(todolistId, 'active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : undefined} title={'Completed'}
                        onClick={() => changeTasksFilter(todolistId, 'completed')}/>
            </div>
        </div>
    )
}
