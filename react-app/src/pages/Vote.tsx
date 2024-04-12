import { BACK_URL } from '@/main';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Modal,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';

const Container = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	gap: '1rem',
	overflowY: 'scroll',
	'@media (max-width: 550px)': {
		gap: 0,
	},
}));

const OptionsContainer = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '3rem',
	'@media (max-width: 550px)': {
		flexDirection: 'column',
		gap: '1rem',
	},
	padding: '1rem',
}));

const OptionCard = styled(Card)(() => ({
	width: '300px',
	'@media (max-width: 710px)': {
		width: '200px',
	},
	'@media (max-width: 550px)': {
		width: '80%',
	},
}));

const ShowMoreButton = styled(Button)(() => ({
	fontSize: '0.7rem',
	left: '50%',
	transform: 'translateX(-50%)',
}));

const ShowMoreModalContent = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '70%',
	backgroundColor: theme.palette.background.paper,
	border: '2px solid #000',
	'@media (max-width: 550px)': {
		width: '90%',
	},
	maxHeight: '80%',
	overflowY: 'scroll',
}));

const ConfirmModalContent = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '40%',
	backgroundColor: theme.palette.background.paper,
	border: '2px solid #000',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	'@media (max-width: 550px)': {
		width: '80%',
	},
	maxHeight: '80%',
	overflowY: 'scroll',
}));

const ModalCard = styled(Card)(() => ({
	width: '100%',
}));

const ModalMultipleOptions = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '3rem',
}));

const fetchOptions = async () => {
	const res = await fetch(`${BACK_URL}/vote/options`);
	return res.json();
};

interface VoteOption {
	value: string;
	coverUrl: string;
	nameFr: string;
	nameEn: string;
	descriptionFr: string;
	descriptionEn: string;
}

interface VoteProps {
	token: string;
	onError: () => void;
}

function ellipseText(text: string, maxLength: number) {
	if (text.length <= maxLength) {
		return text;
	}
	return text.slice(0, maxLength - 3) + '...';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffleArray(array: any[]) {
	const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
	return shuffled;
}

function Vote({ token, onError }: VoteProps) {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const { data, status } = useQuery('voteOptions', fetchOptions);
	const [selectedOption, setSelectedOption] = useState<VoteOption | null>(
		null,
	);
	const [moreModalOpen, setMoreModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);

	const handleShowMore = (option: VoteOption) => {
		setSelectedOption(option);
		setMoreModalOpen(true);
	};

	const handleVote = async () => {
		const res = await fetch(`${BACK_URL}/vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				access_token: token,
				vote: selectedOption?.value,
			}),
		});
		if (!res.ok) {
			toast.error(t('errorVoting'));
			onError();
			return;
		}
		const data = await res.json();
		if (data.success) {
			navigate('/validated');
		} else {
			switch (data.error) {
				case 'INVALID_TOKEN':
					toast.error(t('invalidToken'));
					break;
				case 'ALREADY_VOTED':
					toast.error(t('alreadyVoted'));
					break;
				default:
					toast.error(t('errorVoting'));
					break;
			}
			onError();
		}
	};

	const getName = (option: VoteOption | null) => {
		if (!option) {
			return '';
		}
		return i18n.language === 'fr' ? option.nameFr : option.nameEn;
	};

	const getDescription = (option: VoteOption | null) => {
		if (!option) {
			return '';
		}
		return i18n.language === 'fr'
			? option.descriptionFr
			: option.descriptionEn;
	};

	return (
		<>
			<Modal open={moreModalOpen} onClose={() => setMoreModalOpen(false)}>
				<ShowMoreModalContent>
					<ModalCard>
						<CardHeader title={getName(selectedOption)} />
						<CardMedia
							component="img"
							alt={getName(selectedOption)}
							height="140"
							image={selectedOption?.coverUrl}
						/>
						<CardContent>
							<p>{getDescription(selectedOption)}</p>
							<ModalMultipleOptions>
								<Button
									color="error"
									onClick={() => setMoreModalOpen(false)}
								>
									{t('close')}
								</Button>
								<Button
									color="success"
									onClick={() => setConfirmModalOpen(true)}
								>
									<Trans
										i18nKey="voteFor"
										values={{
											option: getName(selectedOption),
										}}
									/>
								</Button>
							</ModalMultipleOptions>
						</CardContent>
					</ModalCard>
				</ShowMoreModalContent>
			</Modal>
			<Modal
				open={confirmModalOpen}
				onClose={() => setConfirmModalOpen(false)}
			>
				<ConfirmModalContent>
					<ModalCard>
						<CardHeader title={t('confirmVote')} />
						<CardContent>
							<p style={{ textAlign: 'center' }}>
								<Trans
									i18nKey="confirmVoteMessage"
									values={{
										option: getName(selectedOption),
									}}
									components={{ strong: <b /> }}
								/>
							</p>
							<ModalMultipleOptions>
								<Button
									color="error"
									onClick={() => setConfirmModalOpen(false)}
								>
									{t('cancel')}
								</Button>
								<Button color="success" onClick={handleVote}>
									{t('confirmVote')}
								</Button>
							</ModalMultipleOptions>
						</CardContent>
					</ModalCard>
				</ConfirmModalContent>
			</Modal>
			<Container>
				<h1>42 Vote</h1>
				<OptionsContainer>
					{status !== 'success' ? (
						<ClipLoader color="white" />
					) : (
						shuffleArray(data).map((option: VoteOption) => (
							<OptionCard key={option.value}>
								<CardHeader title={getName(option)} />
								<CardMedia
									component="img"
									alt={getName(option)}
									height="140"
									image={option.coverUrl}
								/>
								<CardContent>
									<p>
										{ellipseText(
											getDescription(option),
											200,
										)}
									</p>
									<ShowMoreButton
										onClick={() => handleShowMore(option)}
									>
										{t('showMore')}
									</ShowMoreButton>
								</CardContent>
							</OptionCard>
						))
					)}
				</OptionsContainer>
			</Container>
		</>
	);
}

export default Vote;
