import {FilterValues, Todolist} from "../types/types.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const removeTodolistAC = createAction<{ todolistId: string }>('todolists/remove-todolist')
export const changeTodolistTitleAC = createAction<{
    todolistId: string,
    value: string
}>('todolists/change-todolist-title')
export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValues
}>('todolists/change-todolist-filter')
export const createTodolistAC = createAction('todolists/create-todolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(removeTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const todolist = state.find(td => td.id === action.payload.todolistId)
            if (todolist) {
                todolist.title = action.payload.value
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(td => td.id === action.payload.todolistId)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})

