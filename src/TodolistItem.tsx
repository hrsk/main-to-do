import {TaskType} from "./App.tsx";
import {Button} from "./button/Button.tsx";

type Props = {
    title: string
    tasks?: TaskType[]
}

export const TodolistItem = (props: Props) => {

    const {title, tasks} = props;

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
                                    </li>
                                )
                            })
                        }
                    </ul>
                    : <span>Tasks is empty</span>
            }
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}
