import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { Api42Service } from './api42.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VoteModule } from '../vote/vote.module';

@Module({
	imports: [
		JwtModule.register({
			secret: `${process.env.JWT_SECRET}`,
			signOptions: { expiresIn: '600s' },
		}),
		PrismaModule,
		forwardRef(() => VoteModule),
	],
	controllers: [AuthController],
	providers: [Api42Service, AuthService],
	exports: [AuthService, Api42Service],
})
export class AuthModule {}
