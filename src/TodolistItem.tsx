import {FilterValues, Task, Todolist} from "./types/types";
import {Button} from "./button/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTasksFilter: (todolistId: string, value: FilterValues) => void
    changeTasksStatus: (todolistId: string, taskId: string, value: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
    createTask: (todolistId: string, value: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id: todolistId, title, filter},
        deleteTodolist,
        changeTodolistTitle,
        tasks,
        deleteTask,
        changeTasksFilter,
        changeTasksStatus,
        changeTaskTitle,
        createTask
    } = props;

    const addTask = (value: string) => {
        createTask(todolistId, value)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }
    const changeTodolistTitleHandler = (value: string) => {
        changeTodolistTitle(todolistId, value)
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'baseline'}}>
                <EditableSpan render={(text, onDoubleClick) => <h3
                    onDoubleClick={onDoubleClick}>{text}</h3>}
                              initialValue={title} callback={changeTodolistTitleHandler}/>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <div>
                <CreateItemForm onCreateItem={addTask}/>
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
                            const changeTaskTitleHandler = (value: string) => {
                                changeTaskTitle(todolistId, task.id, value)
                            }
                            return (
                                <li style={{display: 'flex', alignItems: 'baseline'}} key={task.id}
                                    className={task.isDone ? 'is-done' : undefined}>
                                    <input type="checkbox" onChange={changeTasksStatusHandler}
                                           checked={task.isDone}/>
                                    <EditableSpan render={(text, onDoubleClick) => <span
                                        onDoubleClick={onDoubleClick}>{text}</span>}
                                                  initialValue={task.title} callback={changeTaskTitleHandler}/>
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
