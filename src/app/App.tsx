import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from '@mui/material/styles'
import {useAppSelector} from "../common/hooks/useAppSelector.ts"
import {Header} from '../Header.tsx'
import {selectAppTheme} from "../model/app-selectors.ts"
import {getTheme} from "../theme.ts"
import './App.css'
import {Main} from "@/app/Main.tsx";

export const App = () => {

    const themeMode = useAppSelector(selectAppTheme)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}
