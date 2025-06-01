import Box from "@mui/material/Box";
import {containerSx} from "./TodolistItem.styles.ts";
import Button from "@mui/material/Button";
import {FilterValues} from "./types/types.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC} from "./model/todolists-reducer.ts";

type PropsType = {
    todolistId: string
    filter: string
}

export const FilterButtons = ({todolistId, filter}: PropsType) => {

    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterHandler('all')}>all</Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterHandler('active')}>active</Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterHandler('completed')}>completed</Button>
        </Box>
    )
}
