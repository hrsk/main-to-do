import {FilterValues, Todolist} from "../types/types.ts";
import {v1} from "uuid";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case 'remove_todolist': {
            return state.filter(td => td.id !== action.payload.todolistId)
        }
        case 'create_todolist': {
            return [...state, {id: action.payload.todolistId, title: action.payload.value, filter: 'all'}]
        }
        case 'change_todolist_title': {
            return state.map(todolist => todolist.id === action.payload.todolistId ? {
                ...todolist,
                title: action.payload.title
            } : todolist)
        }
        case 'change_todolist_filter': {
            return state.map(todolist => todolist.id === action.payload.todolistId ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'remove_todolist',
        payload: {todolistId},
    } as const
}
export const createTodolistAC = (value: string) => {
    return {
        type: 'create_todolist',
        payload: {todolistId: v1(), value},
    } as const
}
export const changeTodolistTitleAC = (payload: { todolistId: string, title: string }) => {
    return {
        type: 'change_todolist_title',
        payload,
    } as const
}
export const changeTodolistFilterAC = (payload: { todolistId: string, filter: FilterValues }) => {
    return {
        type: 'change_todolist_filter',
        payload,
    } as const
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
    RemoveTodolistActionType
    | CreateTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
