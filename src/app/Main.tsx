import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {Todolists} from "@/Todolists.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTodolistAC} from "@/model/todolists-reducer.ts";

export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (value: string) => {
        dispatch(createTodolistAC(value))
    }

    return (
            <Container maxWidth={'lg'}>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm onCreateItem={(value) => createTodolist(value)}/>
                </Grid>
                <Grid container spacing={4}>
                    <Todolists/>
                </Grid>
            </Container>
    )
}
