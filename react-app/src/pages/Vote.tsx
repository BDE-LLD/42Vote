interface VoteProps {
	token: string;
}

function Vote({ token }: VoteProps) {
	return (
		<div>
			<h1>Vote</h1>
			{token}
		</div>
	);
}

export default Vote;
