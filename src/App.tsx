import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useReducer, useState} from "react";
import {FilterValues, ThemeMode} from "./types/types.ts";
import {v1} from 'uuid';
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {ThemeProvider} from '@mui/material/styles';
import {createTheme} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    createTaskActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./model/tasks-reducer.ts";

export const App = () => {

    // const [filter, setFilter] = useState<FilterValues>('all');
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        components: {},
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    });

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, dispatch] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'Todolist 2', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: []
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(removeTaskActionCreator({todolistId, taskId}))
    }
    const changeTasksFilter = (todolistId: string, value: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter: value}))
    }
    const createTask = (todolistId: string, value: string) => {
        dispatchToTasks(createTaskActionCreator({todolistId, value}))
    }

    const changeTasksStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusActionCreator({todolistId, taskId, isDone}))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        dispatchToTasks(changeTaskTitleActionCreator({todolistId, taskId, value}))
    }

    const deleteTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistId: string, value: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title: value}))
    }
    const createTodolist = (value: string) => {
        const action = createTodolistAC(value)
        dispatch(action)
        dispatchToTasks(action)
    }

    const changeThemeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeThemeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={(value) => createTodolist(value)}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {
                            todolists?.map(todolist => {
                                let filteredTasks = tasks[todolist.id]

                                if (todolist.filter === 'active') {
                                    filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
                                }
                                if (todolist.filter === 'completed') {
                                    filteredTasks = tasks[todolist.id].filter(task => task.isDone)
                                }

                                return (
                                    <Grid key={todolist.id}>
                                        <Paper sx={{p: '0 20px 20px 20px'}}>
                                            <TodolistItem
                                                // key={todolist.id}
                                                todolist={todolist}
                                                tasks={filteredTasks}
                                                deleteTask={deleteTask}
                                                changeTasksFilter={changeTasksFilter}
                                                createTask={createTask}
                                                changeTasksStatus={changeTasksStatus}
                                                changeTaskTitle={changeTaskTitle}
                                                deleteTodolist={deleteTodolist}
                                                changeTodolistTitle={changeTodolistTitle}/>
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}
