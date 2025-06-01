import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { NavButton } from './NavButton'
import Switch from '@mui/material/Switch'
import MenuIcon from '@mui/icons-material/Menu'
import { containerSx } from './TodolistItem.styles'
import { useAppSelector } from './common/hooks/useAppSelector'
import { getTheme } from './theme'
import { selectAppTheme } from './model/app-selectors'
import { useAppDispatch } from './common/hooks/useAppDispatch'
import { changeThemeModeAC } from './model/app-reducer'

export const Header = () => {
	const themeMode = useAppSelector(selectAppTheme)
	const theme = getTheme(themeMode)

	const dispatch = useAppDispatch()

	const changeThemeMode = () => {
		dispatch(
			changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' })
		)
	}

	return (
		<AppBar position='static' sx={{ mb: '30px' }}>
			<Toolbar>
				<Container maxWidth={'lg'} sx={containerSx}>
					<IconButton color='inherit'>
						<MenuIcon />
					</IconButton>
					<div>
						<NavButton>Sign in</NavButton>
						<NavButton>Sign up</NavButton>
						<NavButton background={theme.palette.primary.dark}>Faq</NavButton>
						<Switch color={'default'} onChange={changeThemeMode} />
					</div>
				</Container>
			</Toolbar>
		</AppBar>
	)
}
