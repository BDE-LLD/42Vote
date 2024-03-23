import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { BACK_URL } from './main';
import Login from './pages/Login';
import Vote from './pages/Vote';
import toast from 'react-hot-toast';
import VoteValidated from './pages/VoteValidated';
import { useTranslation } from 'react-i18next';

function AppRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [exchangingCode, setExchangingCode] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	const handleError = () => {
		navigate('/login');
		setToken(null);
		setExchangingCode(false);
	};

	const exchangeCode = useCallback(
		async (code: string) => {
			setExchangingCode(true);
			const res = await fetch(`${BACK_URL}/auth/callback?code=${code}`, {
				method: 'POST',
			});
			if (!res.ok) {
				navigate('/login');
				setToken(null);
				setExchangingCode(false);
				return;
			}
			const data = await res.json();
			if (data.error) {
				navigate('/login');
				setToken(null);
				setExchangingCode(false);
				if (data.error === 'ALREADY_VOTED') {
					toast.error(t('alreadyVoted'));
				}
				return;
			}
			setToken(data.access_token);
			setExchangingCode(false);
			navigate('/app');
		},
		[navigate, t],
	);

	useEffect(() => {
		const code = new URLSearchParams(location.search).get('code');
		if (location.pathname === '/callback') {
			if (code != null) {
				exchangeCode(code);
			}
			navigate('/login');
		}
		if (location.pathname === '/validated') {
			setToken(null);
		}
	}, [location, exchangeCode, navigate]);

	return (
		<Routes>
			<Route
				path="/app"
				element={
					token != null ? (
						<Vote token={token} onError={handleError} />
					) : (
						<Navigate to="/login" />
					)
				}
			/>
			<Route
				path="/login"
				element={
					token != null ? (
						<Navigate to="/app" />
					) : (
						<Login isExchangingCode={exchangingCode} />
					)
				}
			/>
			<Route path="/validated" element={<VoteValidated />} />
			<Route path="*" element={<Navigate replace to="/app" />} />
		</Routes>
	);
}

export default AppRoutes;
