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

function AppRoutes() {
	const location = useLocation();
	const navigate = useNavigate();

	const [exchangingCode, setExchangingCode] = useState(false);
	const [token, setToken] = useState<string | null>(null);

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
				return;
			}
			setToken(data.access_token);
			setExchangingCode(false);
			navigate('/app');
		},
		[navigate],
	);

	useEffect(() => {
		const code = new URLSearchParams(location.search).get('code');
		if (location.pathname === '/callback') {
			if (code != null) {
				exchangeCode(code);
			}
			navigate('/login');
		}
	}, [location, exchangeCode, navigate]);

	return (
		<Routes>
			<Route
				path="/app"
				element={
					token != null ? (
						<Vote token={token} />
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
			<Route path="*" element={<Navigate replace to="/app" />} />
		</Routes>
	);
}

export default AppRoutes;
