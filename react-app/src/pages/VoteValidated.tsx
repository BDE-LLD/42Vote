import styled from '@emotion/styled';

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
	return (
		<Container>
			<h2>Thank you for voting!</h2>
			<p>
				Your vote has been successfully submitted. You can now close
				this tab
			</p>
			<p>
				You can join the{' '}
				<Link href="https://s.bde42.fr/discord" target="_blank">
					BDE&apos;s Discord
				</Link>{' '}
				to stay updated
			</p>
		</Container>
	);
}

export default VoteValidated;
