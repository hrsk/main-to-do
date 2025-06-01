import {Todolist} from "./types/types";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {Tasks} from "./Tasks.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {createTaskActionCreator} from "./model/tasks-reducer.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {TodolistTitle} from './TodolistTitle.tsx'

type Props = {
    todolist: Todolist
}

export const TodolistItem = (props: Props) => {

    const {todolist: {id: todolistId, filter},} = props;

    const dispatch = useAppDispatch()

    const addTask = (value: string) => {
        dispatch(createTaskActionCreator({todolistId, value}))
    }

    return (
        <div>
            <TodolistTitle todolist={props.todolist}/>
            <CreateItemForm onCreateItem={addTask}/>
            <Tasks todolist={props.todolist}/>
            <FilterButtons todolistId={todolistId} filter={filter}/>
        </div>
    )
}
