import {TasksState} from "../types/types"
import {
    createTodolistAC,
    removeTodolistAC,
} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const removeTaskActionCreator = createAction<{ todolistId: string, taskId: string }>('tasks/remove-task')
export const createTaskActionCreator = createAction<{ todolistId: string, value: string }>('tasks/create-task')
export const changeTaskStatusActionCreator = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('tasks/change-task-status')
export const changeTaskTitleActionCreator = createAction<{
    todolistId: string,
    taskId: string,
    value: string
}>('tasks/change-task-title')


export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(removeTaskActionCreator, (state, action) => {
            const task = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)

            if (task !== -1) {
                state[action.payload.todolistId].splice(task, 1)
            }
        })
        .addCase(createTaskActionCreator, (state, action) => {
            state[action.payload.todolistId].unshift({id: nanoid(), title: action.payload.value, isDone: false})
        })
        .addCase(changeTaskStatusActionCreator, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleActionCreator, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.value
            }
        })
})
