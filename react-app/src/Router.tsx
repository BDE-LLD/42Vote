import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';

function AppRouter() {
	return (
		<Router>
			<AppRoutes />
		</Router>
	);
}

export default AppRouter;
