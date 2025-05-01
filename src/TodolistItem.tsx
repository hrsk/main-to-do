import {FilterValues, TaskType} from "./App.tsx";
import {Button} from "./button/Button.tsx";

type Props = {
    title: string
    tasks?: TaskType[]
    deleteTask: (taskId: number) => void
    changeTasksFilter: (value: FilterValues) => void
}

export const TodolistItem = (props: Props) => {

    const {title, tasks, deleteTask, changeTasksFilter} = props;

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'} onClick={() => alert('add todo')}/>
            </div>
            {
                tasks ?
                    <ul style={{listStyle: 'none', paddingLeft: 0}}>
                        {
                            tasks.map(task => {
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                                        <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    : <span>Tasks is empty</span>
            }
            <div>
                <Button title={'All'} onClick={() => changeTasksFilter('all')}/>
                <Button title={'Active'} onClick={() => changeTasksFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeTasksFilter('completed')}/>
            </div>
        </div>
    )
}
