import {TasksState} from "../types/types"
import {CreateTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'remove_todolist': {
            delete state[action.payload.todolistId]
            return {...state}
        }
        default:
            return state
    }
}

type Actions = CreateTodolistActionType | RemoveTodolistActionType