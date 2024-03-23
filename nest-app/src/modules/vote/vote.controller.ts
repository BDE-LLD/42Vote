import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteDto } from './VoteDto';
import { AuthService } from '../auth/auth.service';

@Controller('vote')
export class VoteController {
	constructor(
		private readonly voteService: VoteService,
		private readonly authService: AuthService,
	) {}

	@Get('options')
	async getVoteOptions() {
		return await this.voteService.getVoteOptions();
	}

	@Post()
	async voteForOption(@Body() body: VoteDto) {
		const vote = body.vote;
		if (!(await this.voteService.isValidVoteOption(vote))) {
			throw new BadRequestException('Invalid vote option');
		}
		const voter = this.authService.verifyAccessToken(body.access_token);
		if (!voter) {
			return { error: 'INVALID_TOKEN' };
		}
		if (await this.voteService.hasAlreadyVoted(voter)) {
			return { error: 'ALREADY_VOTED' };
		}
		return await this.voteService.voteForOption(vote, voter);
	}
}
