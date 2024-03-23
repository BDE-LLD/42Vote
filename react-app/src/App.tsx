import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRouter from './Router';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const queryClient = new QueryClient();

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
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<Toaster position="top-center" reverseOrder={false} />
				<Backdrop>
					<AppRouter />
				</Backdrop>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
