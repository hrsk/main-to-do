import {TasksState} from "../types/types"
import {CreateTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer.ts";
import {v1} from "uuid";

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
        case 'remove_task': {
            const {todolistId, taskId} = action.payload
            return {
                ...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)
            }
        }
        case 'create_task': {
            const {todolistId, value} = action.payload
            return {
                ...state,
                [todolistId]: [{id: v1(), title: value, isDone: false}, ...state[todolistId]]
            }
        }
        case 'change_task_status': {
            const {todolistId, taskId, isDone} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
            }
        }
        case 'change_task_title': {
            const {todolistId, taskId, value} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, title: value} : task)
            }
        }
        default:
            return state
    }
}

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

// types

type Actions =
    CreateTodolistActionType
    | RemoveTodolistActionType
    | RemoveTaskActionType
    | CreateTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskActionCreator>
type CreateTaskActionType = ReturnType<typeof createTaskActionCreator>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusActionCreator>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleActionCreator>
