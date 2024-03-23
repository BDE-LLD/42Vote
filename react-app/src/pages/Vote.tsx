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
}));

const OptionsContainer = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '3rem',
}));

const OptionCard = styled(Card)(() => ({
	width: '300px',
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

function Vote({ token, onError }: VoteProps) {
	const navigate = useNavigate();

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
			toast.error(
				'An error occurred while voting. Please try again later',
			);
			onError();
			return;
		}
		const data = await res.json();
		if (data.success) {
			navigate('/validated');
		} else {
			switch (data.error) {
				case 'INVALID_TOKEN':
					toast.error('Your token is invalid, please log in again');
					break;
				case 'ALREADY_VOTED':
					toast.error('You have already voted');
					break;
				default:
					toast.error('An error occurred while voting');
					break;
			}
			onError();
		}
	};

	return (
		<>
			<Modal open={moreModalOpen} onClose={() => setMoreModalOpen(false)}>
				<ShowMoreModalContent>
					<ModalCard>
						<CardHeader title={selectedOption?.nameEn} />
						<CardMedia
							component="img"
							alt={selectedOption?.nameEn}
							height="140"
							image={selectedOption?.coverUrl}
						/>
						<CardContent>
							<p>{selectedOption?.descriptionEn}</p>
							<ModalMultipleOptions>
								<Button
									color="error"
									onClick={() => setMoreModalOpen(false)}
								>
									Close
								</Button>
								<Button
									color="success"
									onClick={() => setConfirmModalOpen(true)}
								>
									Vote for {selectedOption?.nameEn}
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
						<CardHeader title="Confirm vote" />
						<CardContent>
							<p style={{ textAlign: 'center' }}>
								Are you sur you want to vote for{' '}
								<b>{selectedOption?.nameEn}</b> (this action is
								irreversible)?
							</p>
							<ModalMultipleOptions>
								<Button
									color="error"
									onClick={() => setConfirmModalOpen(false)}
								>
									Cancel
								</Button>
								<Button color="success" onClick={handleVote}>
									Confirm vote
								</Button>
							</ModalMultipleOptions>
						</CardContent>
					</ModalCard>
				</ConfirmModalContent>
			</Modal>
			<Container>
				<h1>Options</h1>
				<OptionsContainer>
					{status !== 'success' ? (
						<ClipLoader />
					) : (
						data.map((option: VoteOption) => (
							<OptionCard key={option.value}>
								<CardHeader title={option.nameEn} />
								<CardMedia
									component="img"
									alt={option.nameEn}
									height="140"
									image={option.coverUrl}
								/>
								<CardContent>
									<p>
										{ellipseText(option.descriptionFr, 200)}
									</p>
									<ShowMoreButton
										onClick={() => handleShowMore(option)}
									>
										Show more
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
