import {Todolist} from "../types/types.ts";
import {v1} from "uuid";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case 'remove_todolist': {
            return state.filter(td => td.id !== action.payload.todolistId)
        }
        case 'create_todolist': {
            const todolistId = v1()
            return [...state, {id: todolistId, title: action.payload.value, filter: 'all'}]
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
        payload: {value},
    } as const
}

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type CreateTodolistActionType = ReturnType<typeof createTodolistAC>

type ActionsType = RemoveTodolistActionType | CreateTodolistActionType
