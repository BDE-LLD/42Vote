import { IsString, MinLength } from 'class-validator';

export class VoteDto {
	@IsString()
	@MinLength(1)
	vote: string;

	@IsString()
	@MinLength(1)
	access_token: string;
}
