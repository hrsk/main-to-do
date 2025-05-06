import {FilterValues, Task, Todolist} from "./types/types";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

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
    const changeFilterHandler = (filter: FilterValues) => {
        changeTasksFilter(todolistId, filter)
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'baseline'}}>
                <EditableSpan render={(text, onDoubleClick) => <h3
                    onDoubleClick={onDoubleClick}>{text}</h3>}
                              initialValue={title} callback={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
                {/*<Button title={'x'} onClick={deleteTodolistHandler}/>*/}
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
                <List>
                    {
                        tasks.map(task => {
                            const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTasksStatus(todolistId, task.id, e.currentTarget.checked)
                            }
                            const changeTaskTitleHandler = (value: string) => {
                                changeTaskTitle(todolistId, task.id, value)
                            }
                            const deleteTaskHandler = () => {
                                deleteTask(todolistId, task.id)
                            }
                            return (
                                <ListItem key={task.id}
                                          sx={getListItemSx(task.isDone)}>
                                    {/*<input type="checkbox" onChange={changeTasksStatusHandler}*/}
                                    {/*       checked={task.isDone}/>*/}
                                    <Checkbox onChange={changeTasksStatusHandler} checked={task.isDone}/>
                                    <EditableSpan render={(text, onDoubleClick) => <span
                                        onDoubleClick={onDoubleClick}>{text}</span>}
                                                  initialValue={task.title} callback={changeTaskTitleHandler}/>
                                    <IconButton onClick={deleteTaskHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    {/*<Button title={'x'} onClick={() => deleteTask(todolistId, task.id)}/>*/}
                                </ListItem>
                            )
                        })
                    }
                </List>
            }
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>all</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>completed</Button>
                {/*<Button className={filter === 'all' ? 'active-filter' : undefined} title={'All'}*/}
                {/*        onClick={() => changeTasksFilter(todolistId, 'all')}/>*/}
                {/*<Button className={filter === 'active' ? 'active-filter' : undefined} title={'Active'}*/}
                {/*        onClick={() => changeTasksFilter(todolistId, 'active')}/>*/}
                {/*<Button className={filter === 'completed' ? 'active-filter' : undefined} title={'Completed'}*/}
                {/*        onClick={() => changeTasksFilter(todolistId, 'completed')}/>*/}
            </Box>
        </div>
    )
}
