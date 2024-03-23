import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const Container = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	gap: '1rem',
}));

const Link = styled('a')(() => ({
	textDecoration: 'underline',
	color: 'inherit',
	fontWeight: 'bold',
}));

function VoteValidated() {
	const { t } = useTranslation();
	return (
		<Container>
			<h2>{t('thankVoting')}</h2>
			<p>{t('voteSubmitted')}</p>
			<p>
				{t('joinDiscordFirst')}
				<Link href="https://s.bde42.fr/discord" target="_blank">
					{t('discord')}
				</Link>
				{t('joinDiscordSecond')}
			</p>
		</Container>
	);
}

export default VoteValidated;
