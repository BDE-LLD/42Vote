import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { VoteModule } from './modules/vote/vote.module';

@Module({
	imports: [PrismaModule, AuthModule, VoteModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
