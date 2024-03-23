import ReactDOM from 'react-dom/client';
import App from './App.tsx';

export const BACK_URL = 'http://localhost:3000';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
ReactDOM.createRoot(root).render(<App />);
