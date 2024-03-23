import {
	BadRequestException,
	Controller,
	Get,
	Post,
	Query,
} from '@nestjs/common';
import { Api42Service } from './api42.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly api42Service: Api42Service,
		private readonly authService: AuthService,
	) {
		this.api42Service.get_auth_process();
	}

	@Get()
	async getAuthUrl() {
		return { url: (await this.api42Service.get_auth_process()).url };
	}

	@Post('callback')
	async callback(@Query('code') code: string) {
		if (!code) {
			throw new BadRequestException('No code provided');
		}
		const user =
			await this.api42Service.client.auth_manager.response_auth_process(
				(
					await this.api42Service.get_auth_process()
				).id,
				code,
			);
		if (!user) {
			throw new BadRequestException('No user found on 42 intranet');
		}
		return this.authService.generateToken(user);
	}
}
