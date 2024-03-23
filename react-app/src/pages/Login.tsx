import { BACK_URL } from '@/main';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';

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

const fetchLoginLink = async () => {
	const res = await fetch(`${BACK_URL}/auth`);
	return res.json();
};

interface LoginProps {
	isExchangingCode: boolean;
}

function Login({ isExchangingCode }: LoginProps) {
	const { t } = useTranslation();
	const { data, status } = useQuery('loginLink', fetchLoginLink);

	const handleLoginClick = () => {
		if (status !== 'success') {
			toast.error(
				'Impossible to access backend. Please retry in a few seconds',
			);
			return;
		}
		window.location.href = data.url;
	};

	return (
		<Container>
			{isExchangingCode ? (
				<ClipLoader color="white" />
			) : (
				<>
					<h1>42 Vote</h1>
					<LoginButton
						variant="contained"
						size="large"
						onClick={handleLoginClick}
					>
						{t('login')}
					</LoginButton>
				</>
			)}
		</Container>
	);
}

export default Login;
