import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRouter from './Router';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import Header from './Header';
import { HEADER_SIZE } from './main';

i18next.init({
	fallbackLng: 'en',
	interpolation: { escapeValue: false },
	resources: {
		en: {
			translation: {
				login: 'Login with 42',
				errorVoting:
					'An error occurred while voting. Please try again later',
				invalidToken: 'Your token is invalid, please log in again',
				alreadyVoted: 'You have already voted',
				confirmVote: 'Confirm your vote',
				confirmVoteMessage:
					'Are you sur you want to vote for <strong>{{option}}</strong> (this action is irreversible)?',
				close: 'Close',
				voteFor: 'Vote for {{option}}',
				cancel: 'Cancel',
				showMore: 'Show more',
				thankVoting: 'Thank you for voting!',
				voteSubmitted:
					'Your vote has been successfully submitted. You can now close this tab',
				joinDiscordFirst: 'You can join the ',
				discord: 'BDE Discord',
				joinDiscordSecond: ' to stay informed',
			},
		},
		fr: {
			translation: {
				login: 'Se connecter avec 42',
				errorVoting:
					'Une erreur est survenue lors du vote. Veuillez réessayer plus tard',
				invalidToken:
					'Votre token est invalide, veuillez vous reconnecter',
				alreadyVoted: 'Vous avez déjà voté',
				confirmVote: 'Confirmer votre vote',
				confirmVoteMessage:
					'Êtes-vous sûr de vouloir voter pour <strong>{{option}}</strong> (cette action est irréversible) ?',
				close: 'Fermer',
				voteFor: 'Voter pour {{option}}',
				cancel: 'Annuler',
				showMore: 'Afficher plus',
				thankVoting: "Merci d'avoir voté !",
				voteSubmitted:
					'Votre vote a bien été enregistré. Vous pouvez maintenant fermer cet onglet',
				joinDiscordFirst: 'Vous pouvez rejoindre le ',
				discord: 'Discord du BDE',
				joinDiscordSecond: ' pour rester informé',
			},
		},
	},
});

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

const Content = styled('div')(() => ({
	height: `calc(100% - ${HEADER_SIZE}px)`,
}));

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<I18nextProvider i18n={i18next}>
				<QueryClientProvider client={queryClient}>
					<CssBaseline />
					<Toaster position="top-center" reverseOrder={false} />
					<Backdrop>
						<Header />
						<Content>
							<AppRouter />
						</Content>
					</Backdrop>
				</QueryClientProvider>
			</I18nextProvider>
		</ThemeProvider>
	);
}

export default App;
