import List from '@mui/material/List'
import {Todolist} from "./types/types.ts";
import {useAppSelector} from './common/hooks/useAppSelector.ts';
import {selectTasks} from "./model/tasks-selectors.ts";
import {TaskItem} from "@/TaskItem.tsx";

type PropsType = {
    todolist: Todolist
}

export const Tasks = (props: PropsType) => {

    const tasks = useAppSelector(selectTasks)

    const {todolist: {id: todolistId, filter}} = props

    let filteredTasks = tasks[todolistId]

    if (filter === 'active') {
        filteredTasks = tasks[todolistId].filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks[todolistId].filter(task => task.isDone)
    }


    return (
        <>
            {
                !filteredTasks.length
                && <span>Tasks is empty</span>
            }
            {filteredTasks && (
                <List>
                    {filteredTasks.map(task => <TaskItem key={task.id} task={task} todolistId={todolistId}/>)}
                </List>
            )
            }
        </>
    )
}
