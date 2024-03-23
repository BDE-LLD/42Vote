import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const authorizationHeader = request.headers.authorization;
		if (authorizationHeader) {
			try {
				const token = authorizationHeader.replace('Bearer ', '');
				const login = await this.authService.verifyAccessToken(token);
				if (login) {
					request.accessLogin = login;
					return true;
				}
			} catch (e) {
				return false;
			}
		}
		return false;
	}
}
