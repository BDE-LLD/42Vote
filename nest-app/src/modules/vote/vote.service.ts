import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VoteService {
	constructor(private readonly prismaService: PrismaService) {}

	async getVoteOptions() {
		return await this.prismaService.voteOption.findMany();
	}

	async isValidVoteOption(vote: string) {
		const voteOption = await this.prismaService.voteOption.findUnique({
			where: {
				value: vote,
			},
		});
		return !!voteOption;
	}

	async voteForOption(vote: string, voter: string) {
		await this.prismaService.vote.create({
			data: {
				login: voter,
				voteOptionValue: vote,
			},
		});
		return { success: true };
	}

	async hasAlreadyVoted(voter: string) {
		const vote = await this.prismaService.vote.findFirst({
			where: {
				login: voter,
			},
		});
		return !!vote;
	}

	//TODO: Remove (dev only)
	async resetVote(login: string) {
		await this.prismaService.vote.deleteMany({
			where: {
				login,
			},
		});
	}
}
