import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {FilterValues} from "./types/types.ts";
import {v1} from 'uuid';

export const App = () => {

    const [filter, setFilter] = useState<FilterValues>('all');

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const changeTasksFilter = (value: FilterValues) => {
        setFilter(value)
    }
    const createTask = (value: string) => {
        setTasks([...tasks, {id: v1(), title: value, isDone: false}])
    }

    const changeTasksStatus = (taskId: string, value: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: value} : task))
    }

    let filteredTasks = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'} tasks={filteredTasks} deleteTask={deleteTask} filter={filter}
                          changeTasksFilter={changeTasksFilter} createTask={createTask} changeTasksStatus={changeTasksStatus}/>
        </div>
    )
}
