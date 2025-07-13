import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer.ts";
import {Todolist} from "./types/types.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {EditableComponent} from "@/components/EditableComponent/EditableComponent.tsx";

type PropsType = {
    todolist: Todolist
}

export const TodolistTitle = (props: PropsType) => {

    const {todolist: {id: todolistId, title}} = props

    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => {
        dispatch(removeTodolistAC({todolistId}))
    }
    const changeTodolistTitleHandler = (value: string) => {
        dispatch(changeTodolistTitleAC({todolistId, value}))
    }
    return (
        <div style={{display: 'flex', alignItems: 'baseline'}}>
            <EditableComponent as={'h3'} callback={changeTodolistTitleHandler} initialValue={title}/>
            {/*<EditableSpan render={(text, onDoubleClick) => <h3*/}
            {/*    onDoubleClick={onDoubleClick}>{text}</h3>}*/}
            {/*              initialValue={title} callback={changeTodolistTitleHandler}/>*/}
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
