import { createTheme } from '@mui/material/styles'
import { ThemeMode } from './types/types'

export const getTheme = (themeMode: ThemeMode) =>
	createTheme({
		components: {},
		palette: {
			mode: themeMode,
			primary: {
				main: '#087EA4',
			},
		},
	})
