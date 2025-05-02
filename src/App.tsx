import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {FilterValues, TasksState, Todolist} from "./types/types.ts";
import {v1} from 'uuid';

export const App = () => {

    // const [filter, setFilter] = useState<FilterValues>('all');

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'Todolist 2', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: []
    })


    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const changeTasksFilter = (todolistId: string, value: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist))
    }
    const createTask = (todolistId: string, value: string) => {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title: value, isDone: false}]})
    }

    const changeTasksStatus = (todolistId: string, taskId: string, value: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: value} : task)
        })
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="app">
            {
                todolists.map(todolist => {
                    let filteredTasks = tasks[todolist.id]

                    if (todolist.filter === 'active') {
                        filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = tasks[todolist.id].filter(task => task.isDone)
                    }

                    return (
                        <TodolistItem
                            key={todolist.id}
                            todolist={todolist}
                            tasks={filteredTasks}
                            deleteTask={deleteTask}
                            changeTasksFilter={changeTasksFilter}
                            createTask={createTask}
                            changeTasksStatus={changeTasksStatus}
                            deleteTodolist={deleteTodolist}/>
                    )
                })
            }
        </div>
    )
}
