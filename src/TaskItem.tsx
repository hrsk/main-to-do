import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import {getListItemSx} from "./TodolistItem.styles"
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator
} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Task} from "./types/types";
import {EditableComponent} from "@/components";

type PropsType = {
    task: Task
    todolistId: string
}
export const TaskItem = ({task, todolistId}: PropsType) => {

    const dispatch = useAppDispatch()

    const changeTasksStatusHandler = (taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusActionCreator({todolistId, taskId, isDone}))
    }
    const changeTaskTitleHandler = (taskId: string, value: string) => {
        dispatch(changeTaskTitleActionCreator({todolistId, taskId, value}))
    }
    const deleteTaskHandler = (taskId: string) => {
        dispatch(removeTaskActionCreator({todolistId, taskId}))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <Checkbox
                onChange={(event) => changeTasksStatusHandler(task.id, event.currentTarget.checked)}
                checked={task.isDone}
            />
            <EditableComponent initialValue={task.title}
                               callback={(value) => changeTaskTitleHandler(task.id, value)}>{task.title}</EditableComponent>

            <IconButton onClick={() => deleteTaskHandler(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}