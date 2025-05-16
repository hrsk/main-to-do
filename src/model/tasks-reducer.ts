import {TasksState} from "../types/types"
import {
    createTodolistAC,
    removeTodolistAC,
} from "./todolists-reducer.ts";
import {createReducer} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
})

//action creators

export const removeTaskActionCreator = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: 'remove_task',
        payload
    } as const
}
export const createTaskActionCreator = (payload: { todolistId: string, value: string }) => {
    return {
        type: 'create_task',
        payload
    } as const
}
export const changeTaskStatusActionCreator = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {
        type: 'change_task_status',
        payload
    } as const
}
export const changeTaskTitleActionCreator = (payload: { todolistId: string, taskId: string, value: string }) => {
    return {
        type: 'change_task_title',
        payload
    } as const
}
