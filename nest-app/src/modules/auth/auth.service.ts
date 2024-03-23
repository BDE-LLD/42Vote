import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoggedUser } from '42.js/dist/structures/logged_user';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
	) {}

	generateToken(user42: LoggedUser) {
		return {
			access_token: this.jwtService.sign({
				type: 'access_token',
				login: user42.login,
			}),
		};
	}

	async verifyAccessToken(token: string): Promise<string> {
		try {
			const decoded = this.jwtService.verify(token);
			if (
				!decoded.type ||
				!decoded.login ||
				decoded.type !== 'access_token'
			) {
				throw new BadRequestException('Invalid access token');
			}
			return decoded.login;
		} catch (e) {
			throw new BadRequestException('Invalid access token');
		}
	}
}
