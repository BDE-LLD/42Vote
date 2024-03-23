import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const Container = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	gap: '1rem',
}));

const LoginButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	fontSize: '1.5rem',
}));

function Login() {
	return (
		<Container>
			<h1>42 Vote</h1>
			<LoginButton variant="contained" size="large">
				Login with 42
			</LoginButton>
		</Container>
	);
}

export default Login;
