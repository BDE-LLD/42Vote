import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [PrismaModule, forwardRef(() => AuthModule)],
	controllers: [VoteController],
	providers: [VoteService],
	exports: [VoteService],
})
export class VoteModule {}
