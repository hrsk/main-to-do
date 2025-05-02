import {FilterValues, Task} from "./types/types";
import {Button} from "./button/Button.tsx";
import {useState, KeyboardEvent, ChangeEvent} from "react";

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: string) => void
    changeTasksFilter: (value: FilterValues) => void
    changeTasksStatus: (taskId: string, value: boolean) => void
    createTask: (value: string) => void
}

export const TodolistItem = (props: Props) => {

    const {title, tasks, filter, deleteTask, changeTasksFilter, changeTasksStatus, createTask} = props;

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
            createTask(trimmedValue)
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

        return (
            <div>
                <h3>{title}</h3>
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
                                    changeTasksStatus(task.id, e.currentTarget.checked)
                                }
                                return (
                                    <li key={task.id} className={task.isDone ? 'is-done' : undefined}>
                                        <input type="checkbox" onChange={changeTasksStatusHandler}
                                               checked={task.isDone}/>
                                        <span>{task.title}</span>
                                        <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
                <div>
                    <Button className={filter === 'all' ? 'active-filter' : undefined} title={'All'} onClick={() => changeTasksFilter('all')}/>
                    <Button className={filter === 'active' ? 'active-filter' : undefined} title={'Active'} onClick={() => changeTasksFilter('active')}/>
                    <Button className={filter === 'completed' ? 'active-filter' : undefined} title={'Completed'} onClick={() => changeTasksFilter('completed')}/>
                </div>
            </div>
        )
    }
