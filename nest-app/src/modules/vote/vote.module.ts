import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [VoteController],
	providers: [VoteService],
	exports: [],
})
export class VoteModule {}
