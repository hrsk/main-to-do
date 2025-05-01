import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {FilterValues} from "./types/types.ts";

export const App = () => {

    const [filter, setFilter] = useState<FilterValues>('all');

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const changeTasksFilter = (value: FilterValues) => {
        setFilter(value)
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
            <TodolistItem title={'What to learn'} tasks={filteredTasks} deleteTask={deleteTask}
                          changeTasksFilter={changeTasksFilter}/>
        </div>
    )
}
