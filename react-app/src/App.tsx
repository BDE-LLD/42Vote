import Login from './login/Login';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const Backdrop = styled('div')(() => ({
	backgroundColor: 'rgb(16, 20, 24)',
	bottom: 0,
	left: 0,
	right: 0,
	top: 0,
	position: 'fixed',
	width: '100%',
	height: '100%',
}));

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Backdrop>
				<Login />
			</Backdrop>
		</ThemeProvider>
	);
}

export default App;
